import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export type User = {
  id: string;
  username: string;
  phone: string;
  passwordHash: string;
  createdAt: string;
};

type Session = {
  token: string;
  userId: string;
  expiresAt: number;
};

const dataDir = path.join(process.cwd(), "data");
const usersFile = path.join(dataDir, "users.json");
const sessionsFile = path.join(dataDir, "sessions.json");

function ensureFiles() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, "[]", "utf8");
  if (!fs.existsSync(sessionsFile)) fs.writeFileSync(sessionsFile, "[]", "utf8");
}

function readJson<T>(file: string): T {
  ensureFiles();
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

function writeJson(file: string, value: unknown) {
  ensureFiles();
  fs.writeFileSync(file, JSON.stringify(value, null, 2), "utf8");
}

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  const verify = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(verify, "hex"));
}

export function findUserByPhone(phone: string) {
  const users = readJson<User[]>(usersFile);
  return users.find((u) => u.phone === phone) || null;
}

export function findUserByIdentity(identity: string) {
  const users = readJson<User[]>(usersFile);
  const id = identity.toLowerCase();
  return users.find((u) => u.phone === identity || u.username.toLowerCase() === id) || null;
}

export function findUserById(id: string) {
  const users = readJson<User[]>(usersFile);
  return users.find((u) => u.id === id) || null;
}

export function createUser(input: { username: string; phone: string; password: string }) {
  const users = readJson<User[]>(usersFile);
  if (users.some((u) => u.phone === input.phone)) {
    throw new Error("PHONE_EXISTS");
  }
  const user: User = {
    id: crypto.randomUUID(),
    username: input.username,
    phone: input.phone,
    passwordHash: hashPassword(input.password),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeJson(usersFile, users);
  return user;
}

export function createSession(userId: string, ttlDays = 7) {
  const sessions = readJson<Session[]>(sessionsFile);
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + ttlDays * 24 * 60 * 60 * 1000;
  sessions.push({ token, userId, expiresAt });
  writeJson(sessionsFile, sessions);
  return token;
}

export function getSessionUser(token: string | undefined) {
  if (!token) return null;
  const sessions = readJson<Session[]>(sessionsFile);
  const valid = sessions.find((s) => s.token === token && s.expiresAt > Date.now());
  if (!valid) return null;
  return findUserById(valid.userId);
}

export function deleteSession(token: string | undefined) {
  if (!token) return;
  const sessions = readJson<Session[]>(sessionsFile);
  writeJson(
    sessionsFile,
    sessions.filter((s) => s.token !== token)
  );
}
