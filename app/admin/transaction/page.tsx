"use client";

import { useEffect, useState } from "react";

type Tx = { id:number; tx_type:string; amount:string; status:string; note:string; approved_by:string; created_at:string; username:string; full_name:string; member_id:number };
type Member = { id:number; username:string; full_name:string };

export default function TransactionPage() {
  const [rows,setRows]=useState<Tx[]>([]);
  const [members,setMembers]=useState<Member[]>([]);
  const [page,setPage]=useState(1);
  const [total,setTotal]=useState(0);
  const [status,setStatus]=useState("");
  const [txType,setTxType]=useState("");
  const [q,setQ]=useState("");
  const [memberId,setMemberId]=useState("");
  const [amount,setAmount]=useState("");
  const [newType,setNewType]=useState("deposit");
  const [msg,setMsg]=useState("");
  const pageSize=10;

  async function loadMembers(){ const r=await fetch('/api/admin/members/table?page=1'); const d=await r.json(); if(r.ok) setMembers((d.rows||[]).map((x:any)=>({id:x.id,username:x.username,full_name:x.full_name}))); }
  async function load(){ const sp=new URLSearchParams({page:String(page),status,txType,q}); const r=await fetch(`/api/admin/transactions/table?${sp}`); const d=await r.json(); if(r.ok){setRows(d.rows||[]);setTotal(d.total||0);} }

  useEffect(()=>{load();},[page,status,txType]);
  useEffect(()=>{loadMembers();},[]);

  async function createTx(e:React.FormEvent){ e.preventDefault(); setMsg("");
    const r=await fetch('/api/admin/transactions/table',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'create',memberId:Number(memberId),txType:newType,amount:Number(amount)})});
    const d=await r.json(); if(!r.ok) return setMsg(d.message||'ไม่สำเร็จ'); setMsg('เพิ่มรายการแล้ว'); setAmount(''); load();
  }

  async function changeStatus(id:number, s:'approved'|'rejected'){ const r=await fetch('/api/admin/transactions/table',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'status',id,status:s})}); const d=await r.json(); if(!r.ok) return setMsg(d.message||'เปลี่ยนสถานะไม่สำเร็จ'); load(); }

  return <main className="min-h-screen bg-[#0d1020] text-white p-6 md:p-10"><div className="mx-auto max-w-7xl space-y-4">
    <h1 className="text-3xl font-bold text-yellow-300">ฝากถอนรายวัน (DB จริง)</h1>

    <form onSubmit={createTx} className="grid gap-2 rounded-2xl border border-zinc-700 bg-zinc-900/70 p-4 md:grid-cols-5">
      <select value={memberId} onChange={e=>setMemberId(e.target.value)} className="rounded bg-black/30 px-3 py-2 border border-white/15">
        <option value="">เลือกสมาชิก</option>{members.map(m=><option key={m.id} value={m.id}>{m.username} - {m.full_name}</option>)}
      </select>
      <select value={newType} onChange={e=>setNewType(e.target.value)} className="rounded bg-black/30 px-3 py-2 border border-white/15"><option value="deposit">deposit</option><option value="withdraw">withdraw</option></select>
      <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="จำนวนเงิน" className="rounded bg-black/30 px-3 py-2 border border-white/15" />
      <button className="rounded bg-cyan-600 px-3 py-2">เพิ่มรายการ</button>
      <button type="button" onClick={()=>fetch('/api/admin/db/init',{method:'POST'}).then(()=>{loadMembers();load();})} className="rounded bg-indigo-600 px-3 py-2">Init DB</button>
    </form>

    <div className="flex flex-wrap gap-2">
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="ค้นหาสมาชิก" className="rounded bg-black/30 px-3 py-2 border border-white/15" />
      <select value={txType} onChange={e=>{setTxType(e.target.value);setPage(1)}} className="rounded bg-black/30 px-3 py-2 border border-white/15"><option value="">ทุกประเภท</option><option value="deposit">deposit</option><option value="withdraw">withdraw</option></select>
      <select value={status} onChange={e=>{setStatus(e.target.value);setPage(1)}} className="rounded bg-black/30 px-3 py-2 border border-white/15"><option value="">ทุกสถานะ</option><option value="pending">pending</option><option value="approved">approved</option><option value="rejected">rejected</option></select>
      <button onClick={()=>{setPage(1);load();}} className="rounded bg-cyan-600 px-3 py-2">ค้นหา</button>
    </div>

    {msg && <p className="text-yellow-300">{msg}</p>}

    <div className="overflow-x-auto rounded-2xl border border-zinc-700 bg-zinc-900/70"><table className="min-w-full text-sm"><thead><tr>{['ID','สมาชิก','ประเภท','จำนวน','สถานะ','หมายเหตุ','อนุมัติโดย','เวลา','Action'].map(h=><th key={h} className="bg-zinc-800 px-3 py-2 text-left text-zinc-300">{h}</th>)}</tr></thead><tbody>
      {rows.length===0 ? <tr><td colSpan={9} className="px-3 py-2">ยังไม่มีข้อมูล</td></tr> : rows.map(r=><tr key={r.id} className="border-t border-zinc-700"><td className="px-3 py-2">{r.id}</td><td className="px-3 py-2">{r.username} ({r.full_name})</td><td className="px-3 py-2">{r.tx_type}</td><td className="px-3 py-2">฿{Number(r.amount).toLocaleString()}</td><td className="px-3 py-2">{r.status}</td><td className="px-3 py-2">{r.note||'-'}</td><td className="px-3 py-2">{r.approved_by||'-'}</td><td className="px-3 py-2">{new Date(r.created_at).toLocaleString()}</td><td className="px-3 py-2 flex gap-1"><button onClick={()=>changeStatus(r.id,'approved')} className="rounded bg-emerald-600 px-2 py-1 text-xs">Approve</button><button onClick={()=>changeStatus(r.id,'rejected')} className="rounded bg-red-600 px-2 py-1 text-xs">Reject</button></td></tr>)}
    </tbody></table></div>

    <div className="flex items-center gap-2"><button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="rounded bg-zinc-700 px-3 py-1 disabled:opacity-40">ก่อนหน้า</button><span>หน้า {page}/{Math.max(1,Math.ceil(total/pageSize))}</span><button disabled={page>=Math.ceil(total/pageSize)} onClick={()=>setPage(p=>p+1)} className="rounded bg-zinc-700 px-3 py-1 disabled:opacity-40">ถัดไป</button></div>
  </div></main>;
}
