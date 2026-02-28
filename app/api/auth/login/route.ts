import { NextResponse } from "next/server";
import { db, ensureDb } from "@/lib/db";
import { createMemberToken, verifyPassword } from "@/lib/member-auth";
import { findUserByPhone, verifyPassword as verifyFilePassword } from "@/lib/auth-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const phone = String(body.phone || "").trim();
    const password = String(body.password || "");

    // Primary path: DB
    try {
      if (db) {
        await ensureDb();
        const rows = await db`SELECT id, username, phone, password_hash, active FROM member_users WHERE phone=${phone} LIMIT 1`;
        const user = rows[0];
        if (!user || !user.active || !verifyPassword(password, user.password_hash)) {
          return NextResponse.json({ ok: false, message: "เบอร์หรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 });
        }

        const token = createMemberToken({ userId: user.id, username: user.username, phone: user.phone });
        const res = NextResponse.json({ ok: true, user: { id: user.id, username: user.username, phone: user.phone } });
        res.cookies.set("mf_session", token, { httpOnly: true, sameSite: "lax", secure: false, path: "/", maxAge: 60 * 60 * 24 * 7 });
        return res;
      }
    } catch {
      // fallback below
    }

    // Fallback path: file store
    const user = findUserByPhone(phone);
    if (!user || !verifyFilePassword(password, user.passwordHash)) {
      return NextResponse.json({ ok: false, message: "เบอร์หรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 });
    }

    const token = createMemberToken({ userId: user.id, username: user.username, phone: user.phone });
    const res = NextResponse.json({ ok: true, user: { id: user.id, username: user.username, phone: user.phone } });
    res.cookies.set("mf_session", token, { httpOnly: true, sameSite: "lax", secure: false, path: "/", maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (e) {
    const message = e instanceof Error ? e.message : "ล็อกอินไม่สำเร็จ";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
