import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminSession, getAllAudits } from "@/lib/admin-store";

export async function GET(req: Request) {
  const token = (await cookies()).get("admin_session")?.value;
  const me = getAdminSession(token);
  if (!me) return NextResponse.json({ ok: false }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period") || "daily";
  const all = getAllAudits();
  const now = new Date();

  const filtered = all.filter((a) => {
    const d = new Date(a.at);
    if (period === "monthly") return d.getUTCFullYear() === now.getUTCFullYear() && d.getUTCMonth() === now.getUTCMonth();
    return d.toISOString().slice(0, 10) === now.toISOString().slice(0, 10);
  });

  const rows = ["time,actor,role,action,amount,note", ...filtered.map((x) => `${x.at},${x.actor},${x.role},${x.action},${x.amount ?? ""},${(x.note || "").replace(/,/g, " ")}`)];
  return new Response(rows.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename=audit-${period}.csv`,
    },
  });
}
