import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteSession } from "@/lib/auth-store";

export async function POST() {
  const token = (await cookies()).get("mf_session")?.value;
  deleteSession(token);

  const res = NextResponse.json({ ok: true });
  res.cookies.set("mf_session", "", { path: "/", maxAge: 0 });
  return res;
}
