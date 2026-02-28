import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { hasValidAdminSession, recordFinance } from "@/lib/admin-store";

export async function POST(req: Request) {
  const token = (await cookies()).get("admin_session")?.value;
  if (!hasValidAdminSession(token)) return NextResponse.json({ ok: false }, { status: 401 });

  const body = await req.json();
  const kind = body.kind as "deposit" | "withdraw" | "loss";
  const amount = Number(body.amount || 0);
  const actor = String(body.actor || "unknown");
  const note = String(body.note || "");

  if (!["deposit", "withdraw", "loss"].includes(kind) || amount <= 0 || !actor) {
    return NextResponse.json({ ok: false, message: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  const stats = recordFinance({ kind, amount, actor, note });
  return NextResponse.json({ ok: true, stats });
}
