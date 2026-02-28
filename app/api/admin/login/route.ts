import { NextResponse } from "next/server";
import { appendAudit, createAdminSession, verifyAdminPassword } from "@/lib/admin-store";

export async function POST(req: Request) {
  const body = await req.json();
  const password = String(body.password || "");
  const actor = String(body.actor || "admin");

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ ok: false, message: "รหัสแอดมินไม่ถูกต้อง" }, { status: 401 });
  }

  const token = createAdminSession();
  appendAudit({ actor, action: "admin_login" });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", token, { httpOnly: true, sameSite: "lax", secure: false, path: "/", maxAge: 60 * 60 * 24 * 7 });
  return res;
}
