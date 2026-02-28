const rows = [
  { id: "GW-001", channel: "QR code", method: "ฝาก", amount: 2000, user: "pong007", bank: "K PLUS", status: "พร้อมใช้", checkedAt: "07:07" },
  { id: "GW-002", channel: "QR code", method: "ฝาก", amount: 500, user: "mina22", bank: "TrueMoney", status: "พร้อมใช้", checkedAt: "06:58" },
  { id: "GW-003", channel: "QR code", method: "ถอน", amount: 300, user: "aey89", bank: "SCB", status: "ติดตาม", checkedAt: "06:53" },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0d1020] text-white p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-4">
        <h1 className="text-3xl font-bold text-yellow-300">ตรวจสอบ Gateway</h1>
        <section className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-4">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
            <input placeholder="ค้นหา user / รายการ" className="rounded-lg border border-white/15 bg-black/30 px-3 py-2" />
            <button className="rounded-lg bg-cyan-600 px-3 py-2">ค้นหา</button>
            <span className="text-zinc-400">ช่วงเวลา: วันนี้</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  {['#','ช่องทาง','ประเภท','จำนวน','ยูสเซอร์','ธนาคาร','สถานะ','ตรวจล่าสุด','การจัดการ'].map(h=><th key={h} className="bg-zinc-800 px-3 py-2 text-left text-zinc-300">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-zinc-700 bg-emerald-500/10">
                    <td className="px-3 py-2">{r.id}</td>
                    <td className="px-3 py-2">{r.channel}</td>
                    <td className="px-3 py-2"><span className="rounded bg-cyan-600 px-2 py-1 text-xs">{r.method}</span></td>
                    <td className="px-3 py-2">฿{r.amount.toLocaleString()}</td>
                    <td className="px-3 py-2">{r.user}</td>
                    <td className="px-3 py-2">{r.bank}</td>
                    <td className="px-3 py-2"><span className={`rounded px-2 py-1 text-xs ${r.status === 'พร้อมใช้' ? 'bg-emerald-600' : 'bg-pink-600'}`}>{r.status}</span></td>
                    <td className="px-3 py-2">{r.checkedAt}</td>
                    <td className="px-3 py-2"><button className="rounded bg-sky-700 px-2 py-1 text-xs">ดู</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
