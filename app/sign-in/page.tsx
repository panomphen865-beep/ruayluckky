"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const r = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }),
    });
    const data = await r.json();
    setLoading(false);

    if (!r.ok) {
      setMsg(data.message || "เข้าสู่ระบบไม่สำเร็จ");
      return;
    }

    router.push("/member/home");
  }

  return (
    <main className="min-h-screen bg-[#0f1115] text-white p-6 md:p-10">
      <div className="mx-auto max-w-md rounded-2xl border border-red-700/60 bg-gradient-to-br from-[#4a070b] to-[#1f0508] p-6">
        <h1 className="text-2xl font-bold text-yellow-300">เข้าสู่ระบบ</h1>
        <p className="mt-1 text-sm text-zinc-300">เข้าสู่ระบบสมาชิกเพื่อใช้งานแดชบอร์ด</p>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 outline-none" placeholder="เบอร์โทร" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 outline-none" placeholder="รหัสผ่าน" />
          <button disabled={loading} type="submit" className="w-full rounded-xl bg-gradient-to-r from-red-500 to-red-700 px-4 py-2 font-semibold disabled:opacity-60">
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
          {msg && <p className="text-sm text-red-300">{msg}</p>}
          <p className="text-center text-sm text-zinc-300">ยังไม่มีบัญชี? <a className="text-yellow-300 hover:underline" href="/register">สมัครสมาชิก</a></p>
        </form>
      </div>
    </main>
  );
}
