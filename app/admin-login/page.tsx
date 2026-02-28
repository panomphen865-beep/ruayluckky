"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [actor, setActor] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actor, password }),
    });
    const data = await r.json();
    setLoading(false);

    if (!r.ok) return setMsg(data.message || "เข้าสู่ระบบแอดมินไม่สำเร็จ");
    router.push("/admin");
  }

  return (
    <main className="min-h-screen bg-[#0d1020] text-white p-6 md:p-10">
      <div className="mx-auto max-w-md rounded-2xl border border-violet-600/40 bg-zinc-900/80 p-6">
        <h1 className="text-2xl font-bold text-violet-300">Admin Login</h1>
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <input value={actor} onChange={(e) => setActor(e.target.value)} className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2" placeholder="ชื่อผู้ปฏิบัติงาน" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2" placeholder="รหัสแอดมิน" />
          <button disabled={loading} type="submit" className="w-full rounded-xl bg-violet-600 px-4 py-2 font-semibold disabled:opacity-60">
            {loading ? "กำลังตรวจสอบ..." : "เข้าสู่หลังบ้าน"}
          </button>
          {msg && <p className="text-sm text-red-300">{msg}</p>}
        </form>
      </div>
    </main>
  );
}
