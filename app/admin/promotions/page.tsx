"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Promotion = { id: string; title: string; description: string; active: boolean };

export default function AdminPromotionsPage() {
  const [items, setItems] = useState<Promotion[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const [role, setRole] = useState<string>("");

  async function load() {
    const [pRes, meRes] = await Promise.all([fetch("/api/promotions"), fetch("/api/auth/me")]);
    const pData = await pRes.json();
    const meData = await meRes.json();
    setItems(pData.items || []);
    setRole(meData.user?.role || "GUEST");
  }

  useEffect(() => {
    load();
  }, []);

  async function createPromotion(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/promotions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, active: true }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.error || "สร้างไม่สำเร็จ (ต้องเป็น ADMIN)");
      return;
    }
    setTitle("");
    setDescription("");
    setMsg("เพิ่มโปรโมชันแล้ว");
    await load();
  }

  async function removePromotion(id: string) {
    const res = await fetch(`/api/promotions/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMsg("ลบแล้ว");
      await load();
    } else {
      setMsg("ลบไม่สำเร็จ (ต้องเป็น ADMIN)");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold text-amber-400">หลังบ้าน: จัดการโปรโมชัน</h1>
        <p className="mt-2 text-sm text-zinc-400">สถานะสิทธิ์ปัจจุบัน: <span className="text-amber-300">{role}</span></p>

        <form onSubmit={createPromotion} className="mt-6 space-y-3 rounded-xl border border-amber-500/20 bg-zinc-900 p-5">
          <input className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2" placeholder="หัวข้อโปรโมชัน" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2" placeholder="รายละเอียด" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <button className="rounded-lg bg-amber-400 px-4 py-2 font-semibold text-black">เพิ่มโปรโมชัน</button>
          {!!msg && <p className="text-sm text-zinc-300">{msg}</p>}
        </form>

        <div className="mt-6 space-y-3">
          {items.map((p) => (
            <article key={p.id} className="rounded-xl border border-amber-500/20 bg-zinc-900 p-4">
              <h2 className="font-semibold">{p.title}</h2>
              <p className="mt-1 text-zinc-300">{p.description}</p>
              <button onClick={() => removePromotion(p.id)} className="mt-3 rounded border border-red-500/50 px-3 py-1 text-red-300">ลบ</button>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
