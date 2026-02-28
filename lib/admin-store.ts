import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export type AdminUser = {
  id: string;
  username: string;
  role: "owner" | "manager" | "staff";
  passwordHash: string;
  active: boolean;
  createdAt: string;
};

type AdminSession = {
  token: string;
  adminId: string;
  username: string;
  role: AdminUser["role"];
  expiresAt: number;
};

export type AuditLog = { id: string; at: string; actor: string; role: string; action: string; note?: string; amount?: number };
export type DailyStats = {
  date: string;
  deposit: number;
  withdraw: number;
  moneyLost: number;
  transactions: number;
};

const dataDir = path.join(process.cwd(), "data");
const adminsFile = path.join(dataDir, "admin-users.json");
const adminSessionFile = path.join(dataDir, "admin-sessions.json");
const auditFile = path.join(dataDir, "admin-audit.json");
const dailyFile = path.join(dataDir, "admin-daily.json");

function ensure() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(adminSessionFile)) fs.writeFileSync(adminSessionFile, "[]", "utf8");
  if (!fs.existsSync(auditFile)) fs.writeFileSync(auditFile, "[]", "utf8");
  if (!fs.existsSync(dailyFile)) fs.writeFileSync(dailyFile, "{}", "utf8");

  if (!fs.existsSync(adminsFile)) {
    const defaultAdmin: AdminUser = {
      id: crypto.randomUUID(),
      username: process.env.ADMIN_USER || "owner",
      role: "owner",
      passwordHash: hashPassword(process.env.ADMIN_PASSWORD || "payanak-2026"),
      active: true,
      createdAt: new Date().toISOString(),
    };
    fs.writeFileSync(adminsFile, JSON.stringify([defaultAdmin], null, 2), "utf8");
  }
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

function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string) {
  const [salt, hash] = String(stored || "").split(":");
  if (!salt || !hash) return false;
  const verify = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(verify, "hex"));
}

export function findAdminByUsername(username: string) {
  const admins = readJson<AdminUser[]>(adminsFile, []);
  return admins.find((a) => a.username === username && a.active) || null;
}

export function verifyAdminLogin(username: string, password: string) {
  const admin = findAdminByUsername(username);
  if (!admin) return null;
  if (!verifyPassword(password, admin.passwordHash)) return null;
  return admin;
}

export function createAdminSession(admin: AdminUser) {
  const sessions = readJson<AdminSession[]>(adminSessionFile, []);
  const token = crypto.randomBytes(32).toString("hex");
  sessions.push({ token, adminId: admin.id, username: admin.username, role: admin.role, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 });
  writeJson(adminSessionFile, sessions);
  return token;
}

export function getAdminSession(token?: string) {
  if (!token) return null;
  const sessions = readJson<AdminSession[]>(adminSessionFile, []);
  return sessions.find((s) => s.token === token && s.expiresAt > Date.now()) || null;
}

export function hasValidAdminSession(token?: string) {
  return !!getAdminSession(token);
}

export function deleteAdminSession(token?: string) {
  if (!token) return;
  const sessions = readJson<AdminSession[]>(adminSessionFile, []);
  writeJson(adminSessionFile, sessions.filter((s) => s.token !== token));
}

export function appendAudit(entry: Omit<AuditLog, "id" | "at">) {
  const logs = readJson<AuditLog[]>(auditFile, []);
  logs.unshift({ id: crypto.randomUUID(), at: new Date().toISOString(), ...entry });
  writeJson(auditFile, logs.slice(0, 500));
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

export function recordFinance(input: { kind: "deposit" | "withdraw" | "loss"; amount: number; actor: string; role: string; note?: string }) {
  const stats = getTodayStats();
  const amount = Math.max(0, Number(input.amount || 0));

  if (input.kind === "deposit") stats.deposit += amount;
  if (input.kind === "withdraw") stats.withdraw += amount;
  if (input.kind === "loss") stats.moneyLost += amount;

  stats.transactions += 1;
  writeJson(dailyFile, stats);

  appendAudit({ actor: input.actor, role: input.role, action: input.kind, amount, note: input.note });
  return stats;
}
