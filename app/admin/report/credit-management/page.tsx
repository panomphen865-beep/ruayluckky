"use client";

import { useEffect, useState } from "react";

export default function Page(){
  const [summary,setSummary]=useState<any>(null);
  const [msg,setMsg]=useState('');

  useEffect(()=>{(async()=>{
    const r=await fetch('/api/admin/reports/summary',{cache:'no-store'});
    const d=await r.json();
    if(!r.ok) return setMsg(d.message||'โหลดไม่สำเร็จ');
    setSummary(d.summary);
  })();},[]);

  return <main className="min-h-screen bg-[#0d1020] text-white p-6 md:p-10"><div className="mx-auto max-w-5xl space-y-4">
    <h1 className="text-3xl font-bold text-yellow-300">รายงานการจัดการเครดิต</h1>
    {msg && <p className="text-yellow-300">{msg}</p>}
    {summary && <section className="grid gap-3 md:grid-cols-3">
      <Card t="ยอดฝากรวม" v={`฿${Number(summary.tx.deposit||0).toLocaleString()}`} />
      <Card t="ยอดถอนรวม" v={`฿${Number(summary.tx.withdraw||0).toLocaleString()}`} />
      <Card t="สุทธิ" v={`฿${(Number(summary.tx.deposit||0)-Number(summary.tx.withdraw||0)).toLocaleString()}`} />
    </section>}
  </div></main>
}

function Card({t,v}:{t:string;v:string}){return <article className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-4"><p className="text-sm text-zinc-300">{t}</p><p className="mt-1 text-2xl font-bold text-cyan-300">{v}</p></article>}
