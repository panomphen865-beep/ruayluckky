import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { appendAudit, deleteAdminSession, getAdminSession } from "@/lib/admin-store";

export async function POST() {
  const token = (await cookies()).get("admin_session")?.value;
  const me = getAdminSession(token);
  deleteAdminSession(token);
  if (me) appendAudit({ actor: me.username, role: me.role, action: "admin_logout" });

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", "", { path: "/", maxAge: 0 });
  return res;
}
