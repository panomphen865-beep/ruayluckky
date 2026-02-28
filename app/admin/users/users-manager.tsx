"use client";

import { useEffect, useState } from "react";

type Admin = { id: string; username: string; role: "owner" | "manager" | "staff"; active: boolean; createdAt: string };

export default function UsersManager() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [msg, setMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"owner" | "manager" | "staff">("staff");

  async function load() {
    const r = await fetch("/api/admin/users", { cache: "no-store" });
    const d = await r.json();
    if (r.ok) setAdmins(d.admins || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const u = username.trim().toLowerCase();
    if (u === "owner") return setMsg("ห้ามใช้ owner ซ้ำ ให้ใช้ชื่อใหม่ เช่น staff01");

    const payload = { action: "create", username: u, password: password.trim(), role };
    const r = await fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const d = await r.json();
    if (!r.ok) return setMsg(d.message || "ไม่สำเร็จ");
    setUsername(""); setPassword(""); setRole("staff"); setMsg(`เพิ่มบัญชีแล้ว: ${d.admin?.username || u}`);
    load();
  }

  async function resetPass(adminId: string) {
    const newPassword = prompt("รหัสใหม่ (อย่างน้อย 6 ตัว)");
    if (!newPassword) return;
    const r = await fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "reset-password", adminId, newPassword }) });
    const d = await r.json();
    setMsg(r.ok ? "รีเซ็ตรหัสแล้ว" : d.message || "ไม่สำเร็จ");
  }

  async function deactivate(adminId: string) {
    const r = await fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "deactivate", adminId }) });
    const d = await r.json();
    setMsg(r.ok ? "ปิดการใช้งานแล้ว" : d.message || "ไม่สำเร็จ");
    load();
  }

  return (
    <div className="space-y-4">
      <form onSubmit={createUser} className="grid gap-2 rounded-2xl border border-zinc-700 bg-zinc-900/70 p-4 md:grid-cols-5">
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" className="rounded-lg border border-white/15 bg-black/30 px-3 py-2" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password (>=4)" className="rounded-lg border border-white/15 bg-black/30 px-3 py-2" />
        <select value={role} onChange={(e) => setRole(e.target.value as any)} className="rounded-lg border border-white/15 bg-black/30 px-3 py-2">
          <option value="staff">staff</option><option value="manager">manager</option><option value="owner">owner</option>
        </select>
        <button type="button" onClick={() => setPassword(Math.random().toString(36).slice(-8))} className="rounded-lg bg-violet-600 px-3 py-2 font-semibold">สุ่มรหัส</button>
        <button className="rounded-lg bg-cyan-600 px-3 py-2 font-semibold">เพิ่มบัญชี</button>
      </form>

      {msg && <p className="text-sm rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-3 py-2 text-yellow-300">{msg}</p>}

      <div className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-4">
        <h2 className="mb-2 text-xl font-semibold">รายการแอดมิน</h2>
        <div className="space-y-2">
          {admins.map((a) => (
            <div key={a.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-zinc-700 p-3">
              <p>{a.username} ({a.role}) {a.active ? "🟢" : "🔴"}</p>
              <div className="flex gap-2">
                <button onClick={() => resetPass(a.id)} className="rounded bg-amber-600 px-2 py-1 text-sm">รีเซ็ตรหัส</button>
                {a.role !== "owner" && <button onClick={() => deactivate(a.id)} className="rounded bg-red-600 px-2 py-1 text-sm">ปิดบัญชี</button>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <a href="/api/admin/export?period=daily" className="rounded bg-emerald-600 px-3 py-2 text-sm font-semibold">Export CSV รายวัน</a>
        <a href="/api/admin/export?period=monthly" className="rounded bg-indigo-600 px-3 py-2 text-sm font-semibold">Export CSV รายเดือน</a>
      </div>
    </div>
  );
}
