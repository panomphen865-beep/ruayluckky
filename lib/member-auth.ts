import crypto from "node:crypto";

const secret = process.env.MEMBER_SESSION_SECRET || "member-secret-payanak";

export type MemberSession = {
  userId: number | string;
  username: string;
  phone: string;
  expiresAt: number;
};

export function createMemberToken(payload: Omit<MemberSession, "expiresAt">, days = 7) {
  const body: MemberSession = { ...payload, expiresAt: Date.now() + days * 24 * 60 * 60 * 1000 };
  const encoded = Buffer.from(JSON.stringify(body)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(encoded).digest("hex");
  return `${encoded}.${sig}`;
}

export function parseMemberToken(token?: string) {
  if (!token) return null;
  const [encoded, sig] = token.split(".");
  if (!encoded || !sig) return null;
  const expected = crypto.createHmac("sha256", secret).update(encoded).digest("hex");
  if (expected !== sig) return null;
  try {
    const parsed = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as MemberSession;
    if (parsed.expiresAt < Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = String(stored || "").split(":");
  if (!salt || !hash) return false;
  const verify = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(verify, "hex"));
}
