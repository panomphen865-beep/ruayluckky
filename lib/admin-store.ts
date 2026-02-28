import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

type AdminSession = { token: string; expiresAt: number };
export type AuditLog = { id: string; at: string; actor: string; action: string; note?: string; amount?: number };
export type DailyStats = {
  date: string;
  deposit: number;
  withdraw: number;
  moneyLost: number;
  transactions: number;
};

const dataDir = path.join(process.cwd(), "data");
const adminSessionFile = path.join(dataDir, "admin-sessions.json");
const auditFile = path.join(dataDir, "admin-audit.json");
const dailyFile = path.join(dataDir, "admin-daily.json");

function ensure() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(adminSessionFile)) fs.writeFileSync(adminSessionFile, "[]", "utf8");
  if (!fs.existsSync(auditFile)) fs.writeFileSync(auditFile, "[]", "utf8");
  if (!fs.existsSync(dailyFile)) fs.writeFileSync(dailyFile, "{}", "utf8");
}

function readJson<T>(file: string, fallback: T): T {
  ensure();
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

function writeJson(file: string, value: unknown) {
  ensure();
  fs.writeFileSync(file, JSON.stringify(value, null, 2), "utf8");
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD || "payanak-2026";
  return password === expected;
}

export function createAdminSession() {
  const sessions = readJson<AdminSession[]>(adminSessionFile, []);
  const token = crypto.randomBytes(32).toString("hex");
  sessions.push({ token, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 });
  writeJson(adminSessionFile, sessions);
  return token;
}

export function hasValidAdminSession(token?: string) {
  if (!token) return false;
  const sessions = readJson<AdminSession[]>(adminSessionFile, []);
  return sessions.some((s) => s.token === token && s.expiresAt > Date.now());
}

export function deleteAdminSession(token?: string) {
  if (!token) return;
  const sessions = readJson<AdminSession[]>(adminSessionFile, []);
  writeJson(adminSessionFile, sessions.filter((s) => s.token !== token));
}

export function appendAudit(entry: Omit<AuditLog, "id" | "at">) {
  const logs = readJson<AuditLog[]>(auditFile, []);
  logs.unshift({ id: crypto.randomUUID(), at: new Date().toISOString(), ...entry });
  writeJson(auditFile, logs.slice(0, 300));
}

export function getRecentAudits(limit = 30) {
  const logs = readJson<AuditLog[]>(auditFile, []);
  return logs.slice(0, limit);
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function getTodayStats(): DailyStats {
  const current = readJson<Partial<DailyStats>>(dailyFile, {});
  const today = todayStr();
  if (current.date !== today) {
    const reset: DailyStats = { date: today, deposit: 0, withdraw: 0, moneyLost: 0, transactions: 0 };
    writeJson(dailyFile, reset);
    return reset;
  }
  return {
    date: current.date || today,
    deposit: Number(current.deposit || 0),
    withdraw: Number(current.withdraw || 0),
    moneyLost: Number(current.moneyLost || 0),
    transactions: Number(current.transactions || 0),
  };
}

export function recordFinance(input: { kind: "deposit" | "withdraw" | "loss"; amount: number; actor: string; note?: string }) {
  const stats = getTodayStats();
  const amount = Math.max(0, Number(input.amount || 0));

  if (input.kind === "deposit") stats.deposit += amount;
  if (input.kind === "withdraw") stats.withdraw += amount;
  if (input.kind === "loss") stats.moneyLost += amount;

  stats.transactions += 1;
  writeJson(dailyFile, stats);

  appendAudit({ actor: input.actor || "unknown", action: input.kind, amount, note: input.note });
  return stats;
}
