const navItems = [
  { icon: "🎰", label: "คาสิโน" },
  { icon: "🪙", label: "สล็อต" },
  { icon: "⚽", label: "กีฬา" },
  { icon: "🐟", label: "ยิงปลา" },
  { icon: "🎯", label: "หวย" },
  { icon: "🃏", label: "เกมไพ่" },
];

const featureCards = [
  {
    icon: "🎁",
    title: "โปรโมชั่น",
    desc: "โปรพิเศษสำหรับสมาชิกใหม่และลูกค้าเดิมทุกวัน",
  },
  {
    icon: "🏆",
    title: "กิจกรรม",
    desc: "กิจกรรมสะสมแต้ม แลกรางวัลได้ตลอด 24 ชั่วโมง",
  },
  {
    icon: "🛎️",
    title: "ข่าวสาร",
    desc: "อัปเดตระบบและสิทธิพิเศษใหม่ก่อนใคร",
  },
];

const winners = [
  { name: "u***92", game: "สล็อตแตกหนัก", amount: "฿ 148,000" },
  { name: "b***17", game: "โบนัสกีฬา", amount: "฿ 86,500" },
  { name: "p***44", game: "แจ็คพอตรายวัน", amount: "฿ 209,900" },
];

const faqs = [
  {
    q: "สมัครสมาชิกใช้เวลานานไหม?",
    a: "กรอกข้อมูลพื้นฐานไม่กี่ขั้นตอน ก็เริ่มใช้งานได้ทันที",
  },
  {
    q: "รองรับการใช้งานบนมือถือหรือไม่?",
    a: "รองรับเต็มรูปแบบทั้ง iOS / Android และเดสก์ท็อป",
  },
  {
    q: "มีทีมซัพพอร์ตตลอดเวลาหรือไม่?",
    a: "มีทีมงานดูแลตลอด 24 ชั่วโมง ผ่านช่องทางแชตหลัก",
  },
  {
    q: "สามารถปรับดีไซน์/ข้อความเพิ่มภายหลังได้ไหม?",
    a: "ได้ทั้งหมด โครงหน้าออกแบบให้แก้ไขและต่อยอดได้ง่าย",
  },
];

export default function Page() {
  return (
    <main className="ruay-bg min-h-screen text-white">
      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-4 md:px-6">
        <header className="ruay-panel overflow-hidden rounded-2xl border border-red-800/60">
          <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-[#3b0508] via-[#5b0c10] to-[#3b0508] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-black/40 px-3 py-1 text-lg font-black tracking-wide text-yellow-300">
                RUAYLUCKKY
              </div>
              <span className="hidden text-xs text-zinc-300 md:inline">Premium Entertainment Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="ruay-btn-secondary">เข้าสู่ระบบ</button>
              <button className="ruay-btn-primary">สมัครสมาชิก</button>
            </div>
          </div>

          <nav className="grid grid-cols-3 gap-2 bg-black/40 p-3 md:grid-cols-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className="focus-ring rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-sm transition hover:border-yellow-300/30 hover:bg-white/10"
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        <section className="ruay-hero mt-4 overflow-hidden rounded-2xl border border-red-700/60">
          <div className="grid items-center gap-6 p-6 md:grid-cols-2 md:p-9">
            <div>
              <p className="inline-flex rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-xs text-yellow-200">
                ระบบเร็ว • ฝากถอนลื่น
              </p>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
                ruayluckky
                <span className="block text-yellow-300">เว็บสไตล์พรีเมียม</span>
              </h1>
              <p className="mt-3 max-w-xl text-sm text-zinc-200 md:text-base">
                โทนแดงดำทองแบบอินเตอร์ เฮดเดอร์แน่น แบนเนอร์เด่น การ์ดชัด พร้อมเปิดใช้งานจริงและต่อยอดคอนเทนต์ได้ทันที
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button className="ruay-btn-primary">รับโปรวันนี้</button>
                <button className="ruay-btn-secondary">ดูรายละเอียด</button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-black/25 p-4 backdrop-blur">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-zinc-300">สมาชิกออนไลน์</p>
                  <p className="mt-1 text-xl font-bold text-emerald-300">12,480</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-zinc-300">จ่ายจริงวันนี้</p>
                  <p className="mt-1 text-xl font-bold text-yellow-300">฿ 3.9M</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white/50" />
                <span className="h-2 w-2 rounded-full bg-yellow-300" />
                <span className="h-2 w-2 rounded-full bg-white/50" />
                <span className="h-2 w-2 rounded-full bg-white/50" />
              </div>
            </div>
          </div>
        </section>

        <div className="ruay-marquee mt-3 rounded-xl border border-yellow-500/20 bg-black/40 px-4 py-2 text-sm text-yellow-100">
          <div className="ruay-marquee-track">
            🔔 เปิดให้บริการ 24 ชั่วโมง • โปรโมชั่นใหม่อัปเดตตลอดวัน • ระบบรองรับทุกอุปกรณ์ • ทีมงานพร้อมดูแลตลอดเวลา
          </div>
        </div>

        <section className="mt-5 grid gap-3 md:grid-cols-3">
          {featureCards.map((card) => (
            <article
              key={card.title}
              className="ruay-panel rounded-2xl border border-red-700/60 bg-gradient-to-br from-[#5a080d]/90 to-[#2b0508]/90 p-5 transition hover:-translate-y-0.5"
            >
              <div className="text-3xl">{card.icon}</div>
              <h3 className="mt-2 text-xl font-bold text-yellow-200">{card.title}</h3>
              <p className="mt-1 text-sm text-zinc-200">{card.desc}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-2xl border border-red-800/70 bg-gradient-to-b from-[#3c0609] to-[#170306] p-5 md:p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-extrabold text-yellow-300 md:text-5xl">JACKPOT แตก!</h2>
            <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-zinc-200">อัปเดตล่าสุด</span>
          </div>
          <p className="mt-2 text-zinc-200">แสดงข้อมูลผู้ชนะล่าสุด (ตัวอย่างดีไซน์หน้าเว็บ)</p>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {winners.map((w) => (
              <div key={w.name + w.amount} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-zinc-300">ผู้ใช้: {w.name}</p>
                <p className="mt-1 font-semibold">{w.game}</p>
                <p className="mt-2 text-2xl font-extrabold text-emerald-300">{w.amount}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h3 className="text-xl font-bold text-yellow-200">คำถามที่พบบ่อย</h3>
          <div className="mt-3 space-y-2">
            {faqs.map((f) => (
              <details key={f.q} className="ruay-panel rounded-xl border border-white/10 bg-black/25 p-4">
                <summary className="focus-ring cursor-pointer text-sm font-semibold">{f.q}</summary>
                <p className="mt-2 text-sm text-zinc-300">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="mt-8 border-t border-white/10 pt-6 text-sm text-zinc-400">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} ruayluckky</p>
            <p>Premium dark-red landing • Next.js + Tailwind</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
