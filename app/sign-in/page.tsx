"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: identity.trim(), password }),
      });
      const data = await r.json();
      if (!r.ok) return setMsg(data.message || "เข้าสู่ระบบไม่สำเร็จ");
      router.push("/member/home");
    } catch {
      setMsg("เชื่อมต่อเซิร์ฟเวอร์ไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0f1a] text-white p-4 md:p-10">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-[#141a2a] p-6 shadow-2xl">
        <h1 className="text-3xl font-bold text-white">เข้าสู่ระบบ</h1>
        <p className="mt-1 text-sm text-zinc-300">ใช้เบอร์โทรหรือยูสเซอร์เนมเพื่อเข้าใช้งาน</p>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <input
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
            placeholder="เบอร์โทร / username"
            className="w-full rounded-xl border border-white/15 bg-[#0f1320] px-3 py-2 outline-none focus:border-blue-400"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="รหัสผ่าน"
            className="w-full rounded-xl border border-white/15 bg-[#0f1320] px-3 py-2 outline-none focus:border-blue-400"
          />

          <button disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-[#ff4d5e] to-[#ff2f8f] px-4 py-2 font-semibold disabled:opacity-50">
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>

          {msg && <p className="text-sm text-amber-300">{msg}</p>}
          <p className="text-center text-sm text-zinc-300">ยังไม่มีบัญชี? <a href="/register" className="text-blue-300 hover:underline">สมัครสมาชิก</a></p>
        </form>
      </div>
    </main>
  );
}
