"use client";

import { useEffect, useState } from "react";

type Methods = {
  promptpay: { name: string; accountName: string; accountNo: string; qrImage: string };
  banks: { bank: string; accountName: string; accountNo: string }[];
};

export default function DepositPage() {
  const [methods, setMethods] = useState<Methods | null>(null);
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("");
  const [transferAt, setTransferAt] = useState("");
  const [slipRef, setSlipRef] = useState("");
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
      body: JSON.stringify({ username, amount: Number(amount), bank, transferAt, slipRef }),
    });
    const d = await r.json();
    setMsg(d.message || (r.ok ? "ส่งสำเร็จ" : "ไม่สำเร็จ"));
    if (r.ok) {
      setAmount("");
      setSlipRef("");
    }
  }

  return (
    <main className="min-h-screen bg-[#0d1020] text-white p-6 md:p-10">
      <div className="mx-auto max-w-4xl space-y-4">
        <h1 className="text-3xl font-bold text-yellow-300">ฝากเงิน / แจ้งโอน</h1>

        <section className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-4">
          <h2 className="text-lg font-semibold">ช่องทางโอนเงิน</h2>
          {!methods ? <p className="text-zinc-300">กำลังโหลด...</p> : (
            <div className="mt-3 space-y-3 text-sm">
              <div className="rounded-xl bg-black/20 p-3">
                <p>พร้อมเพย์: {methods.promptpay.accountNo}</p>
                <p>ชื่อบัญชี: {methods.promptpay.accountName}</p>
              </div>
              {methods.banks.map((b) => (
                <div key={b.bank + b.accountNo} className="rounded-xl bg-black/20 p-3">
                  <p>{b.bank}</p>
                  <p>ชื่อบัญชี: {b.accountName}</p>
                  <p>เลขบัญชี: {b.accountNo}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <form onSubmit={submit} className="grid gap-2 rounded-2xl border border-zinc-700 bg-zinc-900/70 p-4">
          <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="username สมาชิก" className="rounded-lg border border-white/15 bg-black/30 px-3 py-2" />
          <input value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="จำนวนเงิน" className="rounded-lg border border-white/15 bg-black/30 px-3 py-2" />
          <input value={bank} onChange={(e)=>setBank(e.target.value)} placeholder="ธนาคารที่โอน" className="rounded-lg border border-white/15 bg-black/30 px-3 py-2" />
          <input value={transferAt} onChange={(e)=>setTransferAt(e.target.value)} placeholder="เวลาโอน เช่น 2026-02-28 11:30" className="rounded-lg border border-white/15 bg-black/30 px-3 py-2" />
          <input value={slipRef} onChange={(e)=>setSlipRef(e.target.value)} placeholder="ลิงก์สลิป/รหัสอ้างอิง (ถ้ามี)" className="rounded-lg border border-white/15 bg-black/30 px-3 py-2" />
          <button className="rounded-lg bg-emerald-600 px-3 py-2 font-semibold">ส่งแจ้งโอน</button>
          {msg && <p className="text-yellow-300">{msg}</p>}
        </form>
      </div>
    </main>
  );
}
