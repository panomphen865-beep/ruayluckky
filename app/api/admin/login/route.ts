import { NextResponse } from "next/server";
import { appendAudit, createAdminSession, verifyAdminLogin } from "@/lib/admin-store";

export async function POST(req: Request) {
  const body = await req.json();
  const username = String(body.username || "").trim();
  const password = String(body.password || "");

  const admin = verifyAdminLogin(username, password);
  if (!admin) {
    return NextResponse.json({ ok: false, message: "ยูสเซอร์หรือรหัสไม่ถูกต้อง" }, { status: 401 });
  }

  const token = createAdminSession(admin);
  appendAudit({ actor: admin.username, role: admin.role, action: "admin_login" });

  const res = NextResponse.json({ ok: true, admin: { username: admin.username, role: admin.role } });
  res.cookies.set("admin_session", token, { httpOnly: true, sameSite: "lax", secure: false, path: "/", maxAge: 60 * 60 * 24 * 7 });
  return res;
}
