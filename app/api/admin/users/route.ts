import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminUser, deactivateAdmin, getAdminSession, listAdmins, resetAdminPassword } from "@/lib/admin-store";

export async function GET() {
  const token = (await cookies()).get("admin_session")?.value;
  const me = getAdminSession(token);
  if (!me) return NextResponse.json({ ok: false }, { status: 401 });
  if (me.role !== "owner") return NextResponse.json({ ok: false, message: "เฉพาะ owner" }, { status: 403 });

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
      const username = String(body.username || "").trim();
      const password = String(body.password || "");
      const role = body.role as "owner" | "manager" | "staff";
      if (!username || password.length < 6 || !["owner", "manager", "staff"].includes(role)) {
        return NextResponse.json({ ok: false, message: "ข้อมูลไม่ครบ" }, { status: 400 });
      }
      const admin = createAdminUser({ username, password, role }, me.username);
      return NextResponse.json({ ok: true, admin });
    }

    if (action === "reset-password") {
      resetAdminPassword({ adminId: String(body.adminId || ""), newPassword: String(body.newPassword || "") }, me.username);
      return NextResponse.json({ ok: true });
    }

    if (action === "deactivate") {
      deactivateAdmin({ adminId: String(body.adminId || "") }, me.username);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, message: "action ไม่ถูกต้อง" }, { status: 400 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "error";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
