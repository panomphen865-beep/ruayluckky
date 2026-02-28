import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminUser, deactivateAdmin, getAdminSession, listAdmins, resetAdminPassword } from "@/lib/admin-store";
import { db, ensureDb } from "@/lib/db";
import crypto from "node:crypto";

function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export async function GET() {
  const token = (await cookies()).get("admin_session")?.value;
  const me = getAdminSession(token);
  if (!me) return NextResponse.json({ ok: false }, { status: 401 });
  if (me.role !== "owner") return NextResponse.json({ ok: false, message: "เฉพาะ owner" }, { status: 403 });

  try {
    await ensureDb();
    if (db) {
      const rows = await db`SELECT id, username, role, active, created_at FROM admin_users ORDER BY id ASC`;
      return NextResponse.json({ ok: true, admins: rows.map((r) => ({ id: String(r.id), username: r.username, role: r.role, active: r.active, createdAt: r.created_at })) });
    }
  } catch {
    // fallback
  }

  return NextResponse.json({ ok: true, admins: listAdmins() });
}

export async function POST(req: Request) {
  const token = (await cookies()).get("admin_session")?.value;
  const me = getAdminSession(token);
  if (!me) return NextResponse.json({ ok: false }, { status: 401 });
  if (me.role !== "owner") return NextResponse.json({ ok: false, message: "เฉพาะ owner" }, { status: 403 });

  const body = await req.json();
  const action = String(body.action || "");

  try {
    if (action === "create") {
      const username = String(body.username || "").trim().toLowerCase();
      const password = String(body.password || "").trim();
      const role = String(body.role || "") as "owner" | "manager" | "staff";

      if (!username) return NextResponse.json({ ok: false, message: "กรอก username" }, { status: 400 });
      if (username === "owner") return NextResponse.json({ ok: false, message: "username owner มีอยู่แล้ว ให้ใช้ชื่อใหม่ เช่น staff01" }, { status: 400 });
      if (password.length < 4) return NextResponse.json({ ok: false, message: "password ต้องอย่างน้อย 4 ตัว" }, { status: 400 });
      if (!["owner", "manager", "staff"].includes(role)) return NextResponse.json({ ok: false, message: "role ไม่ถูกต้อง" }, { status: 400 });

      await ensureDb();
      if (db) {
        const exists = await db`SELECT id FROM admin_users WHERE username=${username} LIMIT 1`;
        if (exists.length) return NextResponse.json({ ok: false, message: "username นี้มีอยู่แล้ว" }, { status: 400 });
        const ph = hashPassword(password);
        const rows = await db`INSERT INTO admin_users (username, role, password_hash, active) VALUES (${username}, ${role}, ${ph}, true) RETURNING id, username, role, active, created_at`;
        const r = rows[0];
        return NextResponse.json({ ok: true, admin: { id: String(r.id), username: r.username, role: r.role, active: r.active, createdAt: r.created_at } });
      }

      const admin = createAdminUser({ username, password, role }, me.username);
      return NextResponse.json({ ok: true, admin });
    }

    if (action === "reset-password") {
      const adminId = String(body.adminId || "");
      const newPassword = String(body.newPassword || "").trim();
      if (newPassword.length < 4) return NextResponse.json({ ok: false, message: "รหัสต้อง >=4" }, { status: 400 });

      await ensureDb();
      if (db) {
        const ph = hashPassword(newPassword);
        await db`UPDATE admin_users SET password_hash=${ph} WHERE id=${Number(adminId)}`;
        return NextResponse.json({ ok: true });
      }

      resetAdminPassword({ adminId, newPassword }, me.username);
      return NextResponse.json({ ok: true });
    }

    if (action === "deactivate") {
      const adminId = String(body.adminId || "");

      await ensureDb();
      if (db) {
        const owner = await db`SELECT role FROM admin_users WHERE id=${Number(adminId)} LIMIT 1`;
        if (owner[0]?.role === "owner") return NextResponse.json({ ok: false, message: "CANNOT_DISABLE_OWNER" }, { status: 400 });
        await db`UPDATE admin_users SET active=false WHERE id=${Number(adminId)}`;
        return NextResponse.json({ ok: true });
      }

      deactivateAdmin({ adminId }, me.username);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, message: "action ไม่ถูกต้อง" }, { status: 400 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "error";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
