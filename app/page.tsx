import Image from "next/image";
import HeroSlider from "./components/HeroSlider";

const navItems = [
  { icon: "🎰", label: "คาสิโน", href: "#" },
  { icon: "🪙", label: "สล็อต", href: "#" },
  { icon: "⚽", label: "กีฬา", href: "#" },
  { icon: "💳", label: "ฝากเงิน", href: "/deposit" },
  { icon: "🎁", label: "โปรโมชัน", href: "/promotion" },
  { icon: "🃏", label: "เกมไพ่", href: "#" },
];

const featureCards = [
  { title: "วิเคราะห์เลขเด็ด", desc: "อัปเดตแนวทางรายวันแบบสั้น อ่านง่าย" },
  { title: "แจ้งเตือนเลขมาแรง", desc: "ติดตามเลขเด่นแบบเร็ว พร้อมจังหวะเข้าเล่น" },
  { title: "ดูสถิติย้อนหลัง", desc: "สรุปข้อมูลเก่าเพื่อวางแผนได้แม่นขึ้น" },
];

export default function Page() {
  return (
    <main className="ruay-bg min-h-screen text-white">
      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-4 md:px-6">
        <header className="ruay-panel overflow-hidden rounded-2xl border border-red-800/60">
          <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-[#3b0508] via-[#5b0c10] to-[#3b0508] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-28 overflow-hidden rounded-lg border border-yellow-300/40 bg-black/20">
                <Image src="/assets/ruayluckky/logo/logo-main.jpg" alt="RuayLucky Logo" width={280} height={100} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-lg font-black tracking-wide text-yellow-300">RUAYLUCKKY</p>
                <span className="hidden text-xs text-zinc-300 md:inline">แจกเลขฟรีทุกงวด • โชคดีทุกวัน</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a href="/sign-in" className="ruay-btn-secondary">เข้าสู่ระบบ</a>
              <a href="/register" className="ruay-btn-primary">สมัครสมาชิก</a>
            </div>
          </div>

          <nav className="grid grid-cols-3 gap-2 bg-black/40 p-3 md:grid-cols-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="focus-ring flex flex-col items-center justify-center rounded-xl border border-red-500/30 bg-gradient-to-b from-[#2b0608] to-[#120305] px-2 py-2 text-center text-xs font-semibold text-zinc-100 transition hover:border-yellow-300/50 hover:text-yellow-200"
              >
                <span className="mb-1 text-base">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </header>

        <HeroSlider />

        <section className="mt-5 grid gap-3 md:grid-cols-3">
          {featureCards.map((card, idx) => (
            <article key={card.title} className="ruay-panel rounded-2xl border border-red-700/60 bg-gradient-to-br from-[#5a080d]/90 to-[#2b0508]/90 p-4">
              <div className="overflow-hidden rounded-xl border border-white/10">
                <Image src="/assets/ruayluckky/features/feature-collage.jpg" alt={`Feature ${idx + 1}`} width={1000} height={1000} className="h-40 w-full object-cover" />
              </div>
              <h3 className="mt-3 text-lg font-bold text-yellow-200">{card.title}</h3>
              <p className="mt-1 text-sm text-zinc-200">{card.desc}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-4 md:p-5">
          <h3 className="mb-3 text-xl font-bold text-yellow-200">เกี่ยวกับเรา</h3>
          <Image src="/assets/ruayluckky/about/about-team.jpg" alt="ทีมงาน RuayLucky" width={1400} height={800} className="h-auto w-full rounded-xl object-cover" />
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-yellow-500/20 bg-black/20">
            <Image src="/assets/ruayluckky/promo/promo-daily.jpg" alt="โปรโมชันรายวัน" width={1200} height={900} className="h-full w-full object-cover" />
          </article>
          <article className="overflow-hidden rounded-2xl border border-yellow-500/20 bg-black/20">
            <Image src="/assets/ruayluckky/promo/promo-vip.jpg" alt="โปรโมชัน VIP" width={1200} height={900} className="h-full w-full object-cover" />
          </article>
        </section>


        <footer className="mt-8 border-t border-white/10 pt-6 text-sm text-zinc-400">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} ruayluckky</p>
            <div className="flex items-center gap-3">
              <a href="/compliance" className="text-yellow-300 hover:underline">Compliance Center</a>
              <p>พร้อมอัปเดตภาพเพิ่มได้อีกทันที</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
