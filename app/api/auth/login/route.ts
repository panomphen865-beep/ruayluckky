import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signAuthToken } from "@/lib/auth";
import { readDb } from "@/lib/db";

const bodySchema = z.object({ email: z.string().email(), password: z.string().min(6) });

export async function POST(req: Request) {
  try {
    const body = bodySchema.parse(await req.json());
    const db = await readDb();
    const user = db.users.find((u) => u.email.toLowerCase() === body.email.toLowerCase());
    if (!user) return NextResponse.json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 });

    const ok = await bcrypt.compare(body.password, user.passwordHash);
    if (!ok) return NextResponse.json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 });

    const token = await signAuthToken({ userId: user.id, role: user.role, email: user.email });
    const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email, role: user.role } });
    res.cookies.set("auth_token", token, { httpOnly: true, sameSite: "lax", secure: false, path: "/", maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch {
    return NextResponse.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }
}
