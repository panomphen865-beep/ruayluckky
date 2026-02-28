import { NextResponse } from "next/server";
import { createSession, findUserByPhone, verifyPassword } from "@/lib/auth-store";

export async function POST(req: Request) {
  const body = await req.json();
  const phone = String(body.phone || "").trim();
  const password = String(body.password || "");

  const user = findUserByPhone(phone);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ ok: false, message: "เบอร์หรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 });
  }

  const token = createSession(user.id);
  const res = NextResponse.json({ ok: true, user: { id: user.id, username: user.username, phone: user.phone } });
  res.cookies.set("mf_session", token, { httpOnly: true, sameSite: "lax", secure: false, path: "/", maxAge: 60 * 60 * 24 * 7 });
  return res;
}
