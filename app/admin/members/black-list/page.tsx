"use client";

import { useEffect, useState } from "react";

type Row = { id:number; username:string; full_name:string; phone:string; status:string; created_at:string };

export default function Page(){
  const [rows,setRows]=useState<Row[]>([]);
  const [msg,setMsg]=useState("");

  useEffect(()=>{(async()=>{
    const r=await fetch('/api/admin/members/table?page=1&status=blacklist', {cache:'no-store'});
    const d=await r.json();
    if(!r.ok) return setMsg(d.message||'โหลดไม่สำเร็จ');
    setRows(d.rows||[]);
  })();},[]);

  return <main className="min-h-screen bg-[#0d1020] text-white p-6 md:p-10"><div className="mx-auto max-w-6xl space-y-4">
    <h1 className="text-3xl font-bold text-yellow-300">รายการแบล็คลิส</h1>
    {msg && <p className="text-yellow-300">{msg}</p>}
    <div className="overflow-x-auto rounded-2xl border border-zinc-700 bg-zinc-900/70">
      <table className="min-w-full text-sm"><thead><tr>{['ID','Username','ชื่อ','เบอร์','สถานะ','เวลาอัปเดต'].map(h=><th key={h} className="bg-zinc-800 px-3 py-2 text-left text-zinc-300">{h}</th>)}</tr></thead>
      <tbody>{rows.length===0?<tr><td className="px-3 py-2" colSpan={6}>ยังไม่มีข้อมูล</td></tr>:rows.map(r=><tr key={r.id} className="border-t border-zinc-700"><td className="px-3 py-2">{r.id}</td><td className="px-3 py-2">{r.username}</td><td className="px-3 py-2">{r.full_name}</td><td className="px-3 py-2">{r.phone}</td><td className="px-3 py-2">{r.status}</td><td className="px-3 py-2">{new Date(r.created_at).toLocaleString()}</td></tr>)}</tbody></table>
    </div>
  </div></main>
}
