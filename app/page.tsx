const highlights = [
  "โครงสร้างพร้อม Deploy บน Vercel",
  "ดีไซน์ Mobile-first ลื่นทุกหน้าจอ",
  "โค้ดอ่านง่าย แก้ไขต่อได้ทันที",
  "ไม่ใช้ asset ติดลิขสิทธิ์",
];

const promos = [
  {
    title: "Premium UI Kit",
    desc: "โทนดำ-ทอง-มรกต พร้อม glass effect และ border glow แบบมืออาชีพ",
    tag: "Design",
  },
  {
    title: "Fast Launch",
    desc: "จัดโครงหน้าให้ครบ Hero / Promo / FAQ / Footer พร้อมใช้งานจริง",
    tag: "Speed",
  },
  {
    title: "Clean Code",
    desc: "โค้ด production-ready แยก section ชัด ดูแลง่ายในระยะยาว",
    tag: "Quality",
  },
];

const steps = [
  { no: "01", title: "ปรับข้อความแบรนด์", desc: "แก้หัวข้อ/CTA ในไฟล์เดียว" },
  { no: "02", title: "ตรวจความเรียบร้อย", desc: "รัน build ให้ผ่านก่อนขึ้นจริง" },
  { no: "03", title: "Deploy", desc: "Push ขึ้น GitHub แล้วปล่อยบน Vercel" },
];

const faqs = [
  {
    q: "ต้องมี backend ไหม?",
    a: "เวอร์ชันนี้เป็น Landing Page ล้วน ไม่ต้องมี backend ก็ใช้งานได้ทันที",
  },
  {
    q: "แก้สีธีมตรงไหน?",
    a: "แก้ใน app/globals.css (คลาส bg-premium, gold-text, glass, glow-border)",
  },
  {
    q: "รองรับมือถือไหม?",
    a: "รองรับเต็มรูปแบบแบบ mobile-first และปรับขนาดตามจออัตโนมัติ",
  },
  {
    q: "ถ้าจะเพิ่มฟอร์มติดต่อทำได้ไหม?",
    a: "ทำได้ โดยเพิ่ม section form และเชื่อม API ภายหลังโดยไม่กระทบโครงหลัก",
  },
];

function CtaButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "focus-ring inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition active:scale-[0.99]";
  const style =
    variant === "primary"
      ? "bg-emerald-400 text-black hover:bg-emerald-300"
      : "border border-white/15 bg-white/5 text-white hover:bg-white/10";
  return (
    <a href={href} className={`${base} ${style}`}>
      {children}
    </a>
  );
}

export default function Page() {
  return (
    <main className="bg-premium relative overflow-hidden">
      <div className="grain relative">
        <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8 md:py-10">
          <header className="glass glow-border flex items-center justify-between rounded-2xl px-4 py-3 md:px-5">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400 text-base font-bold text-black">
                ฿
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide">ruayluckky</p>
                <p className="text-xs text-white/60">Premium Landing Experience</p>
              </div>
            </div>
            <nav className="hidden gap-6 text-sm text-white/75 md:flex">
              <a className="focus-ring rounded-md hover:text-white" href="#promo">Promo</a>
              <a className="focus-ring rounded-md hover:text-white" href="#steps">Steps</a>
              <a className="focus-ring rounded-md hover:text-white" href="#faq">FAQ</a>
            </nav>
          </header>

          <section className="pt-14 md:pt-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-xs text-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Modern • Premium • Ready
              </p>

              <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
                หน้าเว็บพรีเมียมสไตล์สากล
                <span className="gold-text block">สำหรับ ruayluckky</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
                โทนดำ-ทองพร้อม accent เขียวมรกต, spacing โล่งแบบ SaaS/Fintech,
                และโครงสร้างพร้อมต่อยอดใช้งานจริงทันที
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CtaButton href="#steps" variant="primary">เริ่มใช้งานตอนนี้</CtaButton>
                <CtaButton href="#promo" variant="secondary">ดูดีไซน์ตัวอย่าง</CtaButton>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <div className="glass glow-border grid gap-3 rounded-2xl p-4 sm:grid-cols-2 md:grid-cols-4">
              {highlights.map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section id="promo" className="mt-14">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Promo Highlights</h2>
            <p className="mt-2 text-sm text-white/65">การ์ดพรีเมียม พร้อม hover/active state และอ่านง่ายทุกอุปกรณ์</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {promos.map((card) => (
                <article
                  key={card.title}
                  className="glass glow-border rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-emerald-300/30 active:translate-y-0"
                >
                  <span className="inline-block rounded-full border border-yellow-300/30 bg-yellow-300/10 px-2.5 py-1 text-xs text-yellow-200">
                    {card.tag}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{card.desc}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="steps" className="mt-14">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">เริ่มต้น 3 ขั้น</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {steps.map((s) => (
                <div key={s.no} className="glass glow-border rounded-2xl p-5">
                  <p className="text-xs text-emerald-200">STEP {s.no}</p>
                  <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">คำถามที่พบบ่อย</h2>
            <div className="mt-5 space-y-3">
              {faqs.map((item) => (
                <details
                  key={item.q}
                  className="glass glow-border rounded-xl p-4 open:border-emerald-300/30"
                >
                  <summary className="focus-ring cursor-pointer list-none text-sm font-medium text-white">
                    {item.q}
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <footer className="mt-16 border-t border-white/10 py-8 text-sm text-white/55">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} ruayluckky</p>
              <p className="text-white/45">Built with Next.js + Tailwind • Premium Landing</p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
