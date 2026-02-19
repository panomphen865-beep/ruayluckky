import { NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
import { verifyAuthToken } from "@/lib/auth";
import { readDb, writeDb } from "@/lib/db";

const bodySchema = z.object({ title: z.string().min(1).optional(), description: z.string().min(1).optional(), active: z.boolean().optional() });

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

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const { id } = await ctx.params;

  try {
    const body = bodySchema.parse(await req.json());
    const db = await readDb();
    const idx = db.promotions.findIndex((p) => p.id === id);
    if (idx < 0) return NextResponse.json({ error: "not found" }, { status: 404 });
    db.promotions[idx] = { ...db.promotions[idx], ...body };
    await writeDb(db);
    return NextResponse.json({ ok: true, item: db.promotions[idx] });
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
}

export async function DELETE(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const { id } = await ctx.params;
  const db = await readDb();
  db.promotions = db.promotions.filter((p) => p.id !== id);
  await writeDb(db);
  return NextResponse.json({ ok: true });
}
