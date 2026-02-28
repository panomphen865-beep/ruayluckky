import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminSession, getRecentAudits, getTodayStats } from "@/lib/admin-store";

export async function GET() {
  const token = (await cookies()).get("admin_session")?.value;
  const me = getAdminSession(token);
  if (!me) return NextResponse.json({ ok: false }, { status: 401 });

  const stats = getTodayStats();
  const audits = getRecentAudits(30);
  return NextResponse.json({ ok: true, me, stats, audits });
}
