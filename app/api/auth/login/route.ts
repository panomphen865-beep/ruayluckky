import { NextResponse } from "next/server";
import { db, ensureDb } from "@/lib/db";
import { createMemberToken, verifyPassword } from "@/lib/member-auth";

export async function POST(req: Request) {
  try {
    if (!db) return NextResponse.json({ ok: false, message: "ระบบฐานข้อมูลยังไม่พร้อม" }, { status: 500 });
    await ensureDb();

    const body = await req.json();
    const identity = String(body.phone || "").trim().toLowerCase(); // accept phone or username from same field
    const password = String(body.password || "");

    const rows = await db`SELECT id, username, phone, password_hash, active FROM member_users WHERE phone=${identity} OR LOWER(username)=${identity} LIMIT 1`;
    const user = rows[0];

    if (!user || !user.active || !verifyPassword(password, user.password_hash)) {
      return NextResponse.json({ ok: false, message: "เบอร์/ยูสเซอร์หรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 });
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
