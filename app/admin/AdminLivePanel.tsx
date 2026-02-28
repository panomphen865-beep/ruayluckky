"use client";

import { useEffect, useState } from "react";

type Stats = { date: string; deposit: number; withdraw: number; moneyLost: number; transactions: number };
type Audit = { id: string; at: string; actor: string; role: string; action: string; amount?: number; note?: string };
type Me = { username: string; role: string };

const menu = [
  { label: "แดชบอร์ด", href: "/admin", roles: ["owner", "manager", "staff"] },
  { label: "รายการสมาชิก", href: "/admin/members", roles: ["owner", "manager", "staff"] },
  { label: "สมาชิกใหม่", href: "/admin/members/new", roles: ["owner", "manager"] },
  { label: "รายการแบล็คลิส", href: "/admin/members/black-list", roles: ["owner", "manager"] },
  { label: "ฝากถอนรายวัน", href: "/admin/transaction", roles: ["owner", "manager", "staff"] },
  { label: "ตรวจสอบ gateway", href: "/admin/transaction/gateway", roles: ["owner", "manager"] },
  { label: "คอมมิชชั่นแนะนำเพื่อน", href: "/admin/commission", roles: ["owner", "manager"] },
  { label: "ถอนยอดเสีย", href: "/admin/commission/lost-bonus", roles: ["owner", "manager"] },
  { label: "ตัดรอบบิล", href: "/admin/report/daily", roles: ["owner", "manager"] },
  { label: "รายงานการจัดการเครดิต", href: "/admin/report/credit-management", roles: ["owner", "manager"] },
  { label: "วิเคราะห์ลูกค้า", href: "/admin/report/analysis/customer", roles: ["owner", "manager"] },
  { label: "วงล้อ", href: "/admin/spin-wheel", roles: ["owner", "manager"] },
  { label: "รายการพนักงาน", href: "/admin/users", roles: ["owner"] },
  { label: "ตั้งค่า", href: "/admin/setting", roles: ["owner"] },
];

export default function AdminLivePanel() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [audits, setAudits] = useState<Audit[]>([]);
  const [me, setMe] = useState<Me | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [kind, setKind] = useState<"deposit" | "withdraw" | "loss">("deposit");
  const [msg, setMsg] = useState("");

  async function load() {
    const r = await fetch("/api/admin/stats", { cache: "no-store" });
    if (!r.ok) return;
    const data = await r.json();
    setStats(data.stats);
    setAudits(data.audits || []);
    setMe(data.me || null);
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 10000);
    return () => clearInterval(t);
  }, []);

  async function submitRecord(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const r = await fetch("/api/admin/record", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, amount: Number(amount), note }),
    });
    const data = await r.json();
    if (!r.ok) return setMsg(data.message || "บันทึกไม่สำเร็จ");
    setMsg("บันทึกแล้ว");
    setAmount("");
    setNote("");
    load();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin-login";
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
      <aside className="rounded-2xl border border-indigo-900 bg-[#11162b] p-4">
        <p className="text-lg font-bold text-white">MGB</p>
        <p className="mt-1 text-xs text-zinc-400">ผู้ใช้: {me?.username || "-"} ({me?.role || "-"})</p>
        <ul className="mt-4 space-y-2 text-sm text-zinc-300">
          {menu.filter((m) => m.roles.includes((me?.role || "staff") as any)).map((m) => (
            <li key={m.href}>
              <a href={m.href} className="block rounded-lg px-3 py-2 hover:bg-white/10">• {m.label}</a>
            </li>
          ))}
        </ul>
        <button onClick={logout} className="mt-4 w-full rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold">ออกจากระบบ</button>
      </aside>

      <div className="space-y-4">
        <section className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 p-4">
            <p className="text-sm text-white/90">สมาชิกออนไลน์</p>
            <p className="text-2xl font-bold">{stats ? stats.transactions + 3500 : 0}</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-600 p-4">
            <p className="text-sm text-white/90">ยอดหมุนเวียนวันนี้</p>
            <p className="text-2xl font-bold">฿{stats ? (stats.deposit + stats.withdraw).toLocaleString() : 0}</p>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-4">
          <Card title="ฝากวันนี้" value={stats ? `฿${stats.deposit.toLocaleString()}` : "-"} />
          <Card title="ถอนวันนี้" value={stats ? `฿${stats.withdraw.toLocaleString()}` : "-"} />
          <Card title="เงินหายวันนี้" value={stats ? `฿${stats.moneyLost.toLocaleString()}` : "-"} />
          <Card title="รายการทั้งหมด" value={stats ? String(stats.transactions) : "-"} />
        </section>

        <section className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-4">
          <h2 className="text-lg font-semibold text-yellow-200">บันทึกรายการสด (รีเซ็ตอัตโนมัติทุกวัน)</h2>
          <form onSubmit={submitRecord} className="mt-3 grid gap-2 md:grid-cols-4">
            <select value={kind} onChange={(e) => setKind(e.target.value as "deposit" | "withdraw" | "loss")} className="rounded-lg border border-white/15 bg-black/30 px-3 py-2">
              <option value="deposit">ฝาก</option>
              <option value="withdraw">ถอน</option>
              <option value="loss">เงินหาย/ขาดทุน</option>
            </select>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="จำนวนเงิน" className="rounded-lg border border-white/15 bg-black/30 px-3 py-2" />
            <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="หมายเหตุ" className="rounded-lg border border-white/15 bg-black/30 px-3 py-2" />
            <button className="rounded-lg bg-cyan-600 px-3 py-2 font-semibold">บันทึกรายการ</button>
          </form>
          {msg && <p className="mt-2 text-sm text-emerald-300">{msg}</p>}
        </section>

        <section className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-4">
          <h2 className="text-lg font-semibold text-yellow-200">Audit Log (รู้ว่าใครทำอะไร)</h2>
          <div className="mt-2 max-h-[300px] overflow-auto text-sm">
            {audits.map((a) => (
              <div key={a.id} className="border-b border-zinc-700 py-2">
                <p><span className="text-zinc-400">{new Date(a.at).toLocaleString()}</span> • <span className="text-cyan-300">{a.actor}</span> ({a.role}) • {a.action} {a.amount ? `฿${a.amount.toLocaleString()}` : ""}</p>
                {a.note && <p className="text-zinc-300">หมายเหตุ: {a.note}</p>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <article className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-4">
      <p className="text-sm text-zinc-300">{title}</p>
      <p className="mt-1 text-2xl font-bold text-cyan-300">{value}</p>
    </article>
  );
}
