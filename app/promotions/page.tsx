"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Promotion = { id: string; title: string; description: string; active: boolean };

export default function PromotionsPage() {
  const [items, setItems] = useState<Promotion[]>([]);

  useEffect(() => {
    fetch("/api/promotions")
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .catch(() => setItems([]));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold text-amber-400">โปรโมชัน</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {items.map((p) => (
            <article key={p.id} className="rounded-xl border border-amber-500/20 bg-zinc-900 p-5">
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className="mt-2 text-zinc-300">{p.description}</p>
              <p className="mt-2 text-xs text-amber-300">สถานะ: {p.active ? "เปิดใช้งาน" : "ปิดใช้งาน"}</p>
            </article>
          ))}
          {!items.length && <p className="text-zinc-400">ยังไม่มีโปรโมชัน</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
