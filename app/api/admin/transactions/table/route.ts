import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminSession, appendAudit } from "@/lib/admin-store";
import { ensureDb, db } from "@/lib/db";

export async function GET(req: Request) {
  const token = (await cookies()).get("admin_session")?.value;
  const me = getAdminSession(token);
  if (!me) return NextResponse.json({ ok: false }, { status: 401 });

  try {
    await ensureDb();
    if (!db) throw new Error("MISSING_DATABASE_URL");

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const pageSize = 10;
    const status = (searchParams.get("status") || "").trim();
    const txType = (searchParams.get("txType") || "").trim();
    const q = (searchParams.get("q") || "").trim();

    const where: string[] = [];
    const values: any[] = [];
    if (status) { values.push(status); where.push(`t.status = $${values.length}`); }
    if (txType) { values.push(txType); where.push(`t.tx_type = $${values.length}`); }
    if (q) { values.push(`%${q}%`); where.push(`(m.username ILIKE $${values.length} OR m.full_name ILIKE $${values.length})`); }
    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const offset = (page - 1) * pageSize;
    const rows = await db.unsafe(`
      SELECT t.id, t.tx_type, t.amount, t.status, t.note, t.approved_by, t.created_at, t.updated_at,
             m.id AS member_id, m.username, m.full_name
      FROM transactions t
      LEFT JOIN members m ON m.id = t.member_id
      ${whereSql}
      ORDER BY t.id DESC
      LIMIT ${pageSize} OFFSET ${offset}
    `, values);

    const totalRows = await db.unsafe(`SELECT COUNT(*)::int AS c FROM transactions t LEFT JOIN members m ON m.id=t.member_id ${whereSql}`, values);

    return NextResponse.json({ ok: true, rows, total: totalRows[0]?.c || 0, page, pageSize });
  } catch (e) {
    const message = e instanceof Error ? e.message : "FAILED";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}

export async function POST(req: Request) {
  const token = (await cookies()).get("admin_session")?.value;
  const me = getAdminSession(token);
  if (!me) return NextResponse.json({ ok: false }, { status: 401 });

  try {
    await ensureDb();
    if (!db) throw new Error("MISSING_DATABASE_URL");

    const body = await req.json();
    const action = String(body.action || "create");

    if (action === "create") {
      const memberId = Number(body.memberId || 0);
      const txType = String(body.txType || "deposit");
      const amount = Number(body.amount || 0);
      const note = String(body.note || "");
      if (!memberId || amount <= 0 || !["deposit", "withdraw"].includes(txType)) {
        return NextResponse.json({ ok: false, message: "ข้อมูลไม่ครบ" }, { status: 400 });
      }
      await db`INSERT INTO transactions (member_id, tx_type, amount, status, note) VALUES (${memberId}, ${txType}, ${amount}, 'pending', ${note})`;
      appendAudit({ actor: me.username, role: me.role, action: "tx_create", amount, note: `${txType} member:${memberId}` });
      return NextResponse.json({ ok: true });
    }

    if (action === "status") {
      if (!(["owner", "manager"] as const).includes(me.role as any)) {
        return NextResponse.json({ ok: false, message: "no permission" }, { status: 403 });
      }
      const id = Number(body.id || 0);
      const status = String(body.status || "");
      const note = String(body.note || "");
      if (!id || !["approved", "rejected", "pending"].includes(status)) {
        return NextResponse.json({ ok: false, message: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
      }
      await db`UPDATE transactions SET status=${status}, note=${note}, approved_by=${me.username}, updated_at=NOW() WHERE id=${id}`;
      appendAudit({ actor: me.username, role: me.role, action: `tx_${status}`, note: `tx:${id}` });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, message: "action ไม่ถูกต้อง" }, { status: 400 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "FAILED";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
