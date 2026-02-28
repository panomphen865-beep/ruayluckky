import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminSession } from "@/lib/admin-store";
import { ensureDb, db } from "@/lib/db";

export async function GET() {
  const token = (await cookies()).get("admin_session")?.value;
  const me = getAdminSession(token);
  if (!me) return NextResponse.json({ ok: false }, { status: 401 });

  try {
    await ensureDb();
    if (!db) throw new Error("MISSING_DATABASE_URL");

    const [members] = await db`SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE status='blacklist')::int AS blacklist FROM members`;
    const [tx] = await db`SELECT
      COALESCE(SUM(CASE WHEN tx_type='deposit' THEN amount ELSE 0 END),0)::numeric AS deposit,
      COALESCE(SUM(CASE WHEN tx_type='withdraw' THEN amount ELSE 0 END),0)::numeric AS withdraw,
      COUNT(*)::int AS total
      FROM transactions`;

    const recent = await db`
      SELECT t.id, t.tx_type, t.amount, t.status, t.created_at, m.username, m.full_name
      FROM transactions t
      LEFT JOIN members m ON m.id=t.member_id
      ORDER BY t.id DESC
      LIMIT 20
    `;

    const topMembers = await db`
      SELECT m.id, m.username, m.full_name, COUNT(t.id)::int AS tx_count,
             COALESCE(SUM(t.amount),0)::numeric AS turnover
      FROM members m
      LEFT JOIN transactions t ON t.member_id=m.id
      GROUP BY m.id
      ORDER BY tx_count DESC, turnover DESC
      LIMIT 10
    `;

    return NextResponse.json({ ok: true, summary: { members, tx }, recent, topMembers });
  } catch (e) {
    const message = e instanceof Error ? e.message : "FAILED";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
