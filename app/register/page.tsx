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

    const r = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, phone, password }),
    });
    const data = await r.json();
    setLoading(false);

    if (!r.ok) {
      setMsg(data.message || "สมัครสมาชิกไม่สำเร็จ");
      return;
    }

    router.push("/member/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#0f1115] text-white p-6 md:p-10">
      <div className="mx-auto max-w-md rounded-2xl border border-yellow-600/40 bg-gradient-to-br from-[#5a080d] to-[#230509] p-6">
        <h1 className="text-2xl font-bold text-yellow-300">สมัครสมาชิก</h1>
        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 outline-none" placeholder="ชื่อผู้ใช้" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 outline-none" placeholder="เบอร์โทร" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 outline-none" placeholder="รหัสผ่าน (อย่างน้อย 6 ตัว)" />
          <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 outline-none" placeholder="ยืนยันรหัสผ่าน" />
          <button disabled={loading} type="submit" className="w-full rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 font-semibold text-black disabled:opacity-60">
            {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
          </button>
          {msg && <p className="text-sm text-red-300">{msg}</p>}
        </form>
      </div>
    </main>
  );
}
