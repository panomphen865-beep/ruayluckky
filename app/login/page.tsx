"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("กำลังเข้าสู่ระบบ...");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setMsg(res.ok ? "เข้าสู่ระบบสำเร็จ" : data.error || "เข้าสู่ระบบไม่สำเร็จ");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="mx-auto max-w-md px-4 py-10">
        <h1 className="text-3xl font-bold text-amber-400">เข้าสู่ระบบ</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-xl border border-amber-500/20 bg-zinc-900 p-5">
          <div>
            <label className="mb-1 block text-sm text-zinc-300">อีเมล</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2" type="email" required />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-300">รหัสผ่าน</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2" type="password" required />
          </div>
          <button className="w-full rounded-lg bg-amber-400 px-4 py-2 font-semibold text-black">เข้าสู่ระบบ</button>
          {!!msg && <p className="text-sm text-zinc-300">{msg}</p>}
        </form>
      </main>
      <Footer />
    </div>
  );
}
