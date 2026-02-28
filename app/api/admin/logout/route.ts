import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { appendAudit, deleteAdminSession } from "@/lib/admin-store";

export async function POST() {
  const token = (await cookies()).get("admin_session")?.value;
  deleteAdminSession(token);
  appendAudit({ actor: "admin", action: "admin_logout" });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", "", { path: "/", maxAge: 0 });
  return res;
}
