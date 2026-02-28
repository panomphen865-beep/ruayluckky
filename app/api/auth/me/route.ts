import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSessionUser } from "@/lib/auth-store";

export async function GET() {
  const token = (await cookies()).get("mf_session")?.value;
  const user = getSessionUser(token);

  if (!user) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, user: { id: user.id, username: user.username, phone: user.phone, createdAt: user.createdAt } });
}
