const pendingRows: Array<{ id: string; channel: string; amount: number; user: string; bank: string; status: string }> = [];
const latestRows: Array<{ id: string; type: string; amount: number; user: string; status: string; at: string }> = [];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0d1020] text-white p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-4">
        <h1 className="text-3xl font-bold text-yellow-300">ฝาก/ถอน รายวัน</h1>

        <section className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-emerald-500/15 p-4 border border-emerald-400/30">
              <p className="text-sm text-emerald-200">ยอดฝากวันนี้</p>
              <p className="text-2xl font-bold">฿ 0.00</p>
            </div>
            <div className="rounded-xl bg-pink-500/15 p-4 border border-pink-400/30">
              <p className="text-sm text-pink-200">ยอดถอนวันนี้</p>
              <p className="text-2xl font-bold">฿ 0.00</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-4">
          <h2 className="mb-3 text-lg font-semibold text-yellow-200">รอดำเนินการ</h2>
          <Table>
            <thead>
              <tr>
                <Th>#</Th><Th>รายการ</Th><Th>ช่องทาง</Th><Th>จำนวน</Th><Th>ยูสเซอร์</Th><Th>ธนาคาร</Th><Th>สถานะ</Th>
              </tr>
            </thead>
            <tbody>
              {pendingRows.length === 0 ? (
                <tr><Td colSpan={7}>ยังไม่มีข้อมูล</Td></tr>
              ) : pendingRows.map((r) => (
                <tr key={r.id} className="border-t border-zinc-700">
                  <Td>{r.id}</Td><Td>ฝาก</Td><Td>{r.channel}</Td><Td>฿{r.amount.toLocaleString()}</Td><Td>{r.user}</Td><Td>{r.bank}</Td><Td><Badge text={r.status} tone="amber" /></Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>

        <section className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-4">
          <h2 className="mb-3 text-lg font-semibold text-yellow-200">รายการล่าสุด</h2>
          <Table>
            <thead>
              <tr>
                <Th>#</Th><Th>ประเภท</Th><Th>จำนวน</Th><Th>ยูสเซอร์</Th><Th>สถานะ</Th><Th>เวลา</Th>
              </tr>
            </thead>
            <tbody>
              {latestRows.length === 0 ? (
                <tr><Td colSpan={6}>ยังไม่มีข้อมูล</Td></tr>
              ) : latestRows.map((r) => (
                <tr key={r.id} className="border-t border-zinc-700">
                  <Td>{r.id}</Td><Td>{r.type}</Td><Td>฿{r.amount.toLocaleString()}</Td><Td>{r.user}</Td><Td><Badge text={r.status} tone={r.status === "สำเร็จ" ? "green" : "blue"} /></Td><Td>{r.at}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
      </div>
    </main>
  );
}

function Table({ children }: { children: React.ReactNode }) { return <div className="overflow-x-auto"><table className="min-w-full text-sm">{children}</table></div>; }
function Th({ children }: { children: React.ReactNode }) { return <th className="bg-zinc-800 px-3 py-2 text-left text-zinc-300">{children}</th>; }
function Td({ children, colSpan }: { children: React.ReactNode; colSpan?: number }) { return <td colSpan={colSpan} className="px-3 py-2">{children}</td>; }
function Badge({ text, tone }: { text: string; tone: "green" | "amber" | "blue" }) {
  const cls = tone === "green" ? "bg-emerald-600" : tone === "amber" ? "bg-amber-600" : "bg-blue-600";
  return <span className={`rounded px-2 py-1 text-xs ${cls}`}>{text}</span>;
}
