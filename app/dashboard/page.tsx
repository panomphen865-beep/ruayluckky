const hotGames = [
  { name: "PG Slot", players: 1284, turnover: "฿2,450,000" },
  { name: "Live Baccarat", players: 932, turnover: "฿1,860,000" },
  { name: "Sports", players: 701, turnover: "฿1,120,000" },
  { name: "Fish Shooting", players: 388, turnover: "฿540,000" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0f1115] text-white p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-5">
        <h1 className="text-3xl font-bold text-yellow-300">ศูนย์ข้อมูลลูกค้า (หน้าโชว์สถิติ)</h1>
        <p className="text-zinc-300">ตัวอย่างหน้าแสดงเกมฮิต ผู้เล่นออนไลน์ และยอดหมุนเวียน</p>

        <section className="grid gap-3 md:grid-cols-4">
          <Card title="ผู้เล่นออนไลน์" value="3,807" color="from-cyan-500 to-blue-600" />
          <Card title="ยอดหมุนเวียนวันนี้" value="฿12,968,000" color="from-violet-500 to-fuchsia-600" />
          <Card title="สมาชิกใหม่" value="202" color="from-emerald-500 to-green-600" />
          <Card title="โปรโมชั่นใช้งาน" value="27" color="from-amber-500 to-orange-600" />
        </section>

        <section className="rounded-2xl border border-zinc-700 bg-zinc-900/60 p-4">
          <h2 className="text-xl font-semibold text-yellow-200">เกมยอดนิยมวันนี้</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-zinc-300">
                <tr>
                  <th className="px-3 py-2 text-left">เกม</th>
                  <th className="px-3 py-2 text-left">ผู้เล่น</th>
                  <th className="px-3 py-2 text-left">ยอดหมุนเวียน</th>
                </tr>
              </thead>
              <tbody>
                {hotGames.map((g) => (
                  <tr key={g.name} className="border-t border-zinc-700/70">
                    <td className="px-3 py-2">{g.name}</td>
                    <td className="px-3 py-2">{g.players.toLocaleString()}</td>
                    <td className="px-3 py-2 text-yellow-300">{g.turnover}</td>
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

function Card({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <article className={`rounded-2xl border border-white/10 bg-gradient-to-br ${color} p-4`}>
      <p className="text-sm text-white/90">{title}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </article>
  );
}
