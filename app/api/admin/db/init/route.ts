import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ensureDb, db } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-store";
import crypto from "node:crypto";

export async function POST() {
  const token = (await cookies()).get("admin_session")?.value;
  const me = getAdminSession(token);
  if (!me) return NextResponse.json({ ok: false }, { status: 401 });
  if (me.role !== "owner") return NextResponse.json({ ok: false }, { status: 403 });

  try {
    await ensureDb();
    if (!db) throw new Error("MISSING_DATABASE_URL");

    const count = await db`SELECT COUNT(*)::int AS c FROM members`;
    if ((count[0]?.c || 0) === 0) {
      await db`
        INSERT INTO members (username, full_name, phone, bank_account, status)
        VALUES
          ('demo001','สมชาย ใจดี','0811111111','123-4-56789-0','active'),
          ('demo002','นิดา สดใส','0822222222','222-2-33333-4','active'),
          ('demo003','ทดสอบ แบล็คลิส','0833333333','555-8-12121-1','blacklist');
      `;
    }

    const owner = await db`SELECT id FROM admin_users WHERE username='owner' LIMIT 1`;
    if (owner.length === 0) {
      const pwd = process.env.ADMIN_PASSWORD || "payanak-2026";
      const salt = crypto.randomBytes(16).toString("hex");
      const hash = crypto.scryptSync(pwd, salt, 64).toString("hex");
      await db`INSERT INTO admin_users (username, role, password_hash, active) VALUES ('owner','owner',${salt + ':' + hash},true)`;
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "INIT_FAILED";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
