import { NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
import { verifyAuthToken } from "@/lib/auth";
import { readDb, writeDb, uid } from "@/lib/db";

const bodySchema = z.object({ title: z.string().min(1), description: z.string().min(1), active: z.boolean().optional() });

async function requireAdmin() {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) return null;
  try {
    const u = await verifyAuthToken(token);
    return u.role === "ADMIN" ? u : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const db = await readDb();
  return NextResponse.json({ items: [...db.promotions].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)) });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  try {
    const body = bodySchema.parse(await req.json());
    const db = await readDb();
    const item = { id: uid(), title: body.title, description: body.description, active: body.active ?? true, createdAt: new Date().toISOString() };
    db.promotions.push(item);
    await writeDb(db);
    return NextResponse.json({ ok: true, item });
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
}
