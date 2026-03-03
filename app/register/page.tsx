"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) return setMsg("รหัสผ่านไม่ตรงกัน");
    if (password.length < 4) return setMsg("รหัสผ่านต้องอย่างน้อย 4 ตัว");

    setLoading(true);
    setMsg("");
    try {
      const r = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), phone: phone.trim(), password }),
      });
      const data = await r.json();
      if (!r.ok) return setMsg(data.message || "สมัครสมาชิกไม่สำเร็จ");
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
        <h1 className="text-3xl font-bold text-white">สมัครสมาชิก</h1>
        <p className="mt-1 text-sm text-zinc-300">สร้างบัญชีเพื่อเข้าเล่นและใช้งานโปรโมชั่น</p>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" className="w-full rounded-xl border border-white/15 bg-[#0f1320] px-3 py-2 outline-none focus:border-blue-400" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="เบอร์โทร" className="w-full rounded-xl border border-white/15 bg-[#0f1320] px-3 py-2 outline-none focus:border-blue-400" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="รหัสผ่าน (>=4)" className="w-full rounded-xl border border-white/15 bg-[#0f1320] px-3 py-2 outline-none focus:border-blue-400" />
          <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" placeholder="ยืนยันรหัสผ่าน" className="w-full rounded-xl border border-white/15 bg-[#0f1320] px-3 py-2 outline-none focus:border-blue-400" />

          <button disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-[#ff4d5e] to-[#ff2f8f] px-4 py-2 font-semibold disabled:opacity-50">
            {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
          </button>

          {msg && <p className="text-sm text-amber-300">{msg}</p>}
          <p className="text-center text-sm text-zinc-300">มีบัญชีแล้ว? <a href="/sign-in" className="text-blue-300 hover:underline">เข้าสู่ระบบ</a></p>
        </form>
      </div>
    </main>
  );
}
