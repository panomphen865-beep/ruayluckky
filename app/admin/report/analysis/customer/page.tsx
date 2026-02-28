"use client";

import { useEffect, useState } from "react";

export default function Page(){
  const [rows,setRows]=useState<any[]>([]);
  const [msg,setMsg]=useState('');

  useEffect(()=>{(async()=>{
    const r=await fetch('/api/admin/reports/summary',{cache:'no-store'});
    const d=await r.json();
    if(!r.ok) return setMsg(d.message||'โหลดไม่สำเร็จ');
    setRows(d.topMembers||[]);
  })();},[]);

  return <main className="min-h-screen bg-[#0d1020] text-white p-6 md:p-10"><div className="mx-auto max-w-6xl space-y-4">
    <h1 className="text-3xl font-bold text-yellow-300">วิเคราะห์ลูกค้า</h1>
    {msg && <p className="text-yellow-300">{msg}</p>}
    <div className="overflow-x-auto rounded-2xl border border-zinc-700 bg-zinc-900/70">
      <table className="min-w-full text-sm"><thead><tr>{['ID','Username','ชื่อ','จำนวนรายการ','Turnover'].map(h=><th key={h} className="bg-zinc-800 px-3 py-2 text-left text-zinc-300">{h}</th>)}</tr></thead>
      <tbody>{rows.length===0 ? <tr><td className="px-3 py-2" colSpan={5}>ยังไม่มีข้อมูล</td></tr> : rows.map((r:any)=><tr key={r.id} className="border-t border-zinc-700"><td className="px-3 py-2">{r.id}</td><td className="px-3 py-2">{r.username}</td><td className="px-3 py-2">{r.full_name}</td><td className="px-3 py-2">{r.tx_count}</td><td className="px-3 py-2">฿{Number(r.turnover||0).toLocaleString()}</td></tr>)}</tbody></table>
    </div>
  </div></main>
}
