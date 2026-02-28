import { NextResponse } from "next/server";
import { createSession, createUser } from "@/lib/auth-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const username = String(body.username || "").trim();
    const phone = String(body.phone || "").trim();
    const password = String(body.password || "");

    if (!username || !phone || password.length < 6) {
      return NextResponse.json({ ok: false, message: "ข้อมูลไม่ครบหรือรหัสผ่านสั้นเกินไป" }, { status: 400 });
    }

    const user = createUser({ username, phone, password });
    const token = createSession(user.id);

    const res = NextResponse.json({ ok: true, user: { id: user.id, username: user.username, phone: user.phone } });
    res.cookies.set("mf_session", token, { httpOnly: true, sameSite: "lax", secure: false, path: "/", maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (e) {
    const msg = e instanceof Error && e.message === "PHONE_EXISTS" ? "เบอร์นี้ถูกใช้แล้ว" : "สมัครไม่สำเร็จ";
    return NextResponse.json({ ok: false, message: msg }, { status: 400 });
  }
}
