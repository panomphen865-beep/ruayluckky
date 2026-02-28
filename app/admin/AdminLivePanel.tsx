"use client";

import { useEffect, useState } from "react";

type Stats = { date: string; deposit: number; withdraw: number; moneyLost: number; transactions: number };
type Audit = { id: string; at: string; actor: string; action: string; amount?: number; note?: string };

export default function AdminLivePanel() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [audits, setAudits] = useState<Audit[]>([]);
  const [actor, setActor] = useState("");
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
      body: JSON.stringify({ kind, amount: Number(amount), actor, note }),
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
    <div className="space-y-4">
      <section className="grid gap-3 md:grid-cols-4">
        <Card title="ฝากวันนี้" value={stats ? `฿${stats.deposit.toLocaleString()}` : "-"} />
        <Card title="ถอนวันนี้" value={stats ? `฿${stats.withdraw.toLocaleString()}` : "-"} />
        <Card title="เงินหาย/ขาดทุนวันนี้" value={stats ? `฿${stats.moneyLost.toLocaleString()}` : "-"} />
        <Card title="จำนวนรายการวันนี้" value={stats ? String(stats.transactions) : "-"} />
      </section>

      <section className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-4">
        <h2 className="text-lg font-semibold text-yellow-200">บันทึกรายการ (สด)</h2>
        <form onSubmit={submitRecord} className="mt-3 grid gap-2 md:grid-cols-5">
          <input value={actor} onChange={(e) => setActor(e.target.value)} placeholder="ชื่อคนทำงาน" className="rounded-lg border border-white/15 bg-black/30 px-3 py-2" />
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
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-yellow-200">Audit Log (ใครทำอะไร)</h2>
          <button onClick={logout} className="rounded-lg bg-red-600 px-3 py-1 text-sm">ออกจากระบบแอดมิน</button>
        </div>
        <div className="max-h-[340px] overflow-auto text-sm">
          {audits.map((a) => (
            <div key={a.id} className="border-b border-zinc-700 py-2">
              <p><span className="text-zinc-400">{new Date(a.at).toLocaleString()}</span> • <span className="text-cyan-300">{a.actor}</span> • {a.action} {a.amount ? `฿${a.amount.toLocaleString()}` : ""}</p>
              {a.note && <p className="text-zinc-300">หมายเหตุ: {a.note}</p>}
            </div>
          ))}
        </div>
      </section>
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
