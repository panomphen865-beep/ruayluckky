import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminSession } from "@/lib/admin-store";
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
    const q = (searchParams.get("q") || "").trim();
    const status = (searchParams.get("status") || "").trim();

    const where: string[] = [];
    const values: any[] = [];
    if (q) {
      values.push(`%${q}%`);
      where.push(`(username ILIKE $${values.length} OR full_name ILIKE $${values.length} OR phone ILIKE $${values.length})`);
    }
    if (status) {
      values.push(status);
      where.push(`status = $${values.length}`);
    }

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const offset = (page - 1) * pageSize;

    const rows = await db.unsafe(`SELECT id, username, full_name, phone, bank_account, status, created_at FROM members ${whereSql} ORDER BY id DESC LIMIT ${pageSize} OFFSET ${offset}`, values);
    const totalRows = await db.unsafe(`SELECT COUNT(*)::int AS c FROM members ${whereSql}`, values);

    return NextResponse.json({ ok: true, rows, total: totalRows[0]?.c || 0, page, pageSize });
  } catch (e) {
    const message = e instanceof Error ? e.message : "FAILED";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
