import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getRecentAudits, getTodayStats, hasValidAdminSession } from "@/lib/admin-store";

export async function GET() {
  const token = (await cookies()).get("admin_session")?.value;
  if (!hasValidAdminSession(token)) return NextResponse.json({ ok: false }, { status: 401 });

  const stats = getTodayStats();
  const audits = getRecentAudits(20);
  return NextResponse.json({ ok: true, stats, audits });
}
