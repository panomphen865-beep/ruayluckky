import { NextResponse } from "next/server";
import { db, ensureDb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await ensureDb();
    if (!db) return NextResponse.json({ ok: false, message: "ระบบฐานข้อมูลยังไม่พร้อม" }, { status: 400 });

    const body = await req.json();
    const username = String(body.username || "").trim();
    const amount = Number(body.amount || 0);
    const bank = String(body.bank || "").trim();
    const transferAt = String(body.transferAt || "").trim();
    const slipRef = String(body.slipRef || "").trim();

    if (!username || amount <= 0 || !bank || !transferAt) {
      return NextResponse.json({ ok: false, message: "กรอกข้อมูลแจ้งโอนไม่ครบ" }, { status: 400 });
    }

    const member = await db`SELECT id FROM members WHERE username=${username} LIMIT 1`;
    if (!member.length) {
      return NextResponse.json({ ok: false, message: "ไม่พบ username สมาชิกในระบบ" }, { status: 404 });
    }

    const note = `bank:${bank} | transferAt:${transferAt} | slip:${slipRef || "-"}`;
    await db`INSERT INTO transactions (member_id, tx_type, amount, status, note) VALUES (${member[0].id}, 'deposit', ${amount}, 'pending', ${note})`;

    return NextResponse.json({ ok: true, message: "ส่งแจ้งโอนเรียบร้อย รอตรวจสอบ" });
  } catch (e) {
    const message = e instanceof Error ? e.message : "แจ้งโอนไม่สำเร็จ";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
