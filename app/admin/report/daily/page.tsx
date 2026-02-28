"use client";

import { useEffect, useState } from "react";

type Data = { summary:any; recent:any[] };

export default function Page(){
  const [data,setData]=useState<Data|null>(null);
  const [msg,setMsg]=useState("");

  useEffect(()=>{(async()=>{
    const r=await fetch('/api/admin/reports/summary',{cache:'no-store'});
    const d=await r.json();
    if(!r.ok) return setMsg(d.message||'โหลดไม่สำเร็จ');
    setData(d);
  })();},[]);

  return <main className="min-h-screen bg-[#0d1020] text-white p-6 md:p-10"><div className="mx-auto max-w-7xl space-y-4">
    <h1 className="text-3xl font-bold text-yellow-300">ตัดรอบบิล / รายงานรายวัน</h1>
    {msg && <p className="text-yellow-300">{msg}</p>}
    {data && <section className="grid gap-3 md:grid-cols-4"> 
      <Card t="สมาชิกทั้งหมด" v={String(data.summary.members.total||0)} />
      <Card t="แบล็คลิส" v={String(data.summary.members.blacklist||0)} />
      <Card t="ยอดฝากรวม" v={`฿${Number(data.summary.tx.deposit||0).toLocaleString()}`} />
      <Card t="ยอดถอนรวม" v={`฿${Number(data.summary.tx.withdraw||0).toLocaleString()}`} />
    </section>}

    <div className="overflow-x-auto rounded-2xl border border-zinc-700 bg-zinc-900/70">
      <table className="min-w-full text-sm"><thead><tr>{['ID','สมาชิก','ประเภท','จำนวน','สถานะ','เวลา'].map(h=><th key={h} className="bg-zinc-800 px-3 py-2 text-left text-zinc-300">{h}</th>)}</tr></thead>
      <tbody>{!data || data.recent.length===0 ? <tr><td className="px-3 py-2" colSpan={6}>ยังไม่มีข้อมูล</td></tr> : data.recent.map((r:any)=><tr key={r.id} className="border-t border-zinc-700"><td className="px-3 py-2">{r.id}</td><td className="px-3 py-2">{r.username||'-'} ({r.full_name||'-'})</td><td className="px-3 py-2">{r.tx_type}</td><td className="px-3 py-2">฿{Number(r.amount).toLocaleString()}</td><td className="px-3 py-2">{r.status}</td><td className="px-3 py-2">{new Date(r.created_at).toLocaleString()}</td></tr>)}</tbody></table>
    </div>
  </div></main>
}

function Card({t,v}:{t:string;v:string}){return <article className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-4"><p className="text-sm text-zinc-300">{t}</p><p className="mt-1 text-2xl font-bold text-cyan-300">{v}</p></article>}
