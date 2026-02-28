"use client";

import { useEffect, useState } from "react";

type Row = { id: number; username: string; full_name: string; phone: string; bank_account: string; status: string; created_at: string };

export default function MembersPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const pageSize = 10;

  async function load() {
    const sp = new URLSearchParams({ page: String(page), q, status });
    const r = await fetch(`/api/admin/members/table?${sp.toString()}`, { cache: "no-store" });
    const d = await r.json();
    if (r.ok) { setRows(d.rows || []); setTotal(d.total || 0); }
  }

  useEffect(() => { load(); }, [page, status]);

  return (
    <main className="min-h-screen bg-[#0d1020] text-white p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-4">
        <h1 className="text-3xl font-bold text-yellow-300">รายการสมาชิก</h1>
        <div className="flex flex-wrap gap-2">
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="ค้นหา username/ชื่อ/เบอร์" className="rounded-lg border border-white/15 bg-black/30 px-3 py-2" />
          <select value={status} onChange={(e)=>{setStatus(e.target.value); setPage(1);}} className="rounded-lg border border-white/15 bg-black/30 px-3 py-2">
            <option value="">ทุกสถานะ</option>
            <option value="active">active</option>
            <option value="blacklist">blacklist</option>
          </select>
          <button onClick={()=>{setPage(1); load();}} className="rounded-lg bg-cyan-600 px-3 py-2">ค้นหา</button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-zinc-700 bg-zinc-900/70">
          <table className="min-w-full text-sm">
            <thead><tr>{["ID","Username","ชื่อ","เบอร์","บัญชีธนาคาร","สถานะ","สมัครเมื่อ"].map(h=><th key={h} className="bg-zinc-800 px-3 py-2 text-left text-zinc-300">{h}</th>)}</tr></thead>
            <tbody>
              {rows.length===0 ? <tr><td colSpan={7} className="px-3 py-2">ยังไม่มีข้อมูล</td></tr> : rows.map(r=>(
                <tr key={r.id} className="border-t border-zinc-700">
                  <td className="px-3 py-2">{r.id}</td><td className="px-3 py-2">{r.username}</td><td className="px-3 py-2">{r.full_name}</td><td className="px-3 py-2">{r.phone}</td><td className="px-3 py-2">{r.bank_account}</td><td className="px-3 py-2">{r.status}</td><td className="px-3 py-2">{new Date(r.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-2">
          <button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="rounded bg-zinc-700 px-3 py-1 disabled:opacity-40">ก่อนหน้า</button>
          <span>หน้า {page} / {Math.max(1, Math.ceil(total/pageSize))}</span>
          <button disabled={page>=Math.ceil(total/pageSize)} onClick={()=>setPage(p=>p+1)} className="rounded bg-zinc-700 px-3 py-1 disabled:opacity-40">ถัดไป</button>
        </div>
      </div>
    </main>
  );
}
