import { NextResponse } from "next/server";
import { db, ensureDb } from "@/lib/db";
import { createMemberToken, hashPassword } from "@/lib/member-auth";

export async function POST(req: Request) {
  try {
    if (!db) return NextResponse.json({ ok: false, message: "ระบบฐานข้อมูลยังไม่พร้อม" }, { status: 500 });
    await ensureDb();

    const body = await req.json();
    const username = String(body.username || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const password = String(body.password || "");

    if (!username || !phone || password.length < 4) {
      return NextResponse.json({ ok: false, message: "กรอกข้อมูลไม่ครบ หรือรหัสผ่านต้อง >= 4 ตัว" }, { status: 400 });
    }

    const exists = await db`SELECT id FROM member_users WHERE username=${username} OR phone=${phone} LIMIT 1`;
    if (exists.length) {
      return NextResponse.json({ ok: false, message: "username หรือเบอร์นี้ถูกใช้แล้ว" }, { status: 400 });
    }

    const ph = hashPassword(password);
    const rows = await db`INSERT INTO member_users (username, phone, password_hash, active) VALUES (${username}, ${phone}, ${ph}, true) RETURNING id, username, phone`;
    const u = rows[0];

    const token = createMemberToken({ userId: u.id, username: u.username, phone: u.phone });
    const res = NextResponse.json({ ok: true, user: { id: u.id, username: u.username, phone: u.phone } });
    res.cookies.set("mf_session", token, { httpOnly: true, sameSite: "lax", secure: false, path: "/", maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (e) {
    const message = e instanceof Error ? e.message : "สมัครไม่สำเร็จ";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
