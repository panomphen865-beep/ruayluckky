"use client";

import { useEffect, useState } from "react";

type Methods = {
  promptpay: { accountName: string; accountNo: string };
  banks: { bank: string; accountName: string; accountNo: string }[];
};

export default function DepositQuickPanel() {
  const [methods, setMethods] = useState<Methods | null>(null);
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("");
  const [transferAt, setTransferAt] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/payment/methods").then((r) => r.json()).then((d) => setMethods(d.methods || null));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const r = await fetch("/api/payment/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, amount: Number(amount), bank, transferAt }),
    });
    const d = await r.json();
    setMsg(d.message || (r.ok ? "ส่งแจ้งโอนสำเร็จ" : "ส่งไม่สำเร็จ"));
  }

  return (
    <section className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4">
      <h2 className="text-xl font-bold text-emerald-300">ฝากเงินด่วน (หน้าแรก)</h2>
      {!methods ? (
        <p className="mt-2 text-zinc-300">กำลังโหลดข้อมูลบัญชี...</p>
      ) : (
        <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
          <div className="rounded-lg bg-black/20 p-3">
            <p>พร้อมเพย์: {methods.promptpay.accountNo}</p>
            <p>ชื่อบัญชี: {methods.promptpay.accountName}</p>
          </div>
          <div className="rounded-lg bg-black/20 p-3">
            {methods.banks.map((b) => (
              <p key={b.bank + b.accountNo}>{b.bank}: {b.accountNo}</p>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={submit} className="mt-3 grid gap-2 md:grid-cols-4">
        <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="username" className="rounded-lg border border-white/15 bg-black/30 px-3 py-2" />
        <input value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="จำนวนเงิน" className="rounded-lg border border-white/15 bg-black/30 px-3 py-2" />
        <input value={bank} onChange={(e)=>setBank(e.target.value)} placeholder="ธนาคารที่โอน" className="rounded-lg border border-white/15 bg-black/30 px-3 py-2" />
        <input value={transferAt} onChange={(e)=>setTransferAt(e.target.value)} placeholder="เวลาโอน" className="rounded-lg border border-white/15 bg-black/30 px-3 py-2" />
        <button className="rounded-lg bg-emerald-600 px-3 py-2 font-semibold md:col-span-4">แจ้งโอนจากหน้าแรก</button>
      </form>
      {msg && <p className="mt-2 text-yellow-300">{msg}</p>}
    </section>
  );
}
