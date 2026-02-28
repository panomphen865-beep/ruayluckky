import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseMemberToken } from "@/lib/member-auth";

export async function GET() {
  const token = (await cookies()).get("mf_session")?.value;
  const user = parseMemberToken(token);
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, user });
}
