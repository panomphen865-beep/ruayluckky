import { NextResponse } from "next/server";
import { appendAudit, createAdminSession, verifyAdminLogin } from "@/lib/admin-store";
import { db, ensureDb } from "@/lib/db";
import crypto from "node:crypto";

function verifyPassword(password: string, stored: string) {
  const [salt, hash] = String(stored || "").split(":");
  if (!salt || !hash) return false;
  const verify = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(verify, "hex"));
}

export async function POST(req: Request) {
  const body = await req.json();
  const username = String(body.username || "").trim().toLowerCase();
  const password = String(body.password || "");

  let admin: any = null;

  try {
    await ensureDb();
    if (db) {
      const rows = await db`SELECT id, username, role, password_hash, active, created_at FROM admin_users WHERE username=${username} LIMIT 1`;
      const found = rows[0];
      if (found && found.active && verifyPassword(password, found.password_hash)) {
        admin = {
          id: String(found.id),
          username: found.username,
          role: found.role,
          active: found.active,
          createdAt: found.created_at,
        };
      }
    }
  } catch {
    // fallback below
  }

  if (!admin) {
    admin = verifyAdminLogin(username, password);
  }

  if (!admin) {
    return NextResponse.json({ ok: false, message: "ยูสเซอร์หรือรหัสไม่ถูกต้อง" }, { status: 401 });
  }

  const token = createAdminSession(admin);
  appendAudit({ actor: admin.username, role: admin.role, action: "admin_login" });

  const res = NextResponse.json({ ok: true, admin: { username: admin.username, role: admin.role } });
  res.cookies.set("admin_session", token, { httpOnly: true, sameSite: "lax", secure: false, path: "/", maxAge: 60 * 60 * 24 * 7 });
  return res;
}
