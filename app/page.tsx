"use client";

const features = [
  { title: "เร็ว + เบา", desc: "หน้าเว็บโหลดไว ดีไซน์คม ใช้ได้ดีบนมือถือ" },
  { title: "พร้อมขึ้น Vercel", desc: "โครง Next.js + Tailwind ที่เข้ากับ Vercel แบบตรงรุ่น" },
  { title: "ปรับแต่งง่าย", desc: "แก้ข้อความ/ปุ่ม/สี ได้จากไฟล์เดียว" },
];

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-black to-zinc-900">
      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 py-16">
        <div className="mb-6 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-xs tracking-wider text-emerald-300">
          RUAY LUCKKY
        </div>
        <h1 className="text-center text-4xl font-extrabold leading-tight text-yellow-300 md:text-6xl">
          Ruay Luckky
        </h1>
        <p className="mt-4 max-w-2xl text-center text-zinc-300 md:text-lg">
          เว็บพร้อมใช้งานบน Vercel แล้ว โครงสร้างสะอาด โหลดไว และพร้อมต่อยอดทันที
        </p>
        <div className="mt-10 grid w-full gap-4 md:grid-cols-3">
          {features.map((f) => (
            <article key={f.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur">
              <h2 className="text-lg font-bold text-white">{f.title}</h2>
              <p className="mt-2 text-sm text-zinc-300">{f.desc}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="https://vercel.com/new" target="_blank" className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-400">
            Deploy on Vercel
          </a>
          <a href="https://github.com" target="_blank" className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-bold text-zinc-100 transition hover:bg-zinc-800">
            Open GitHub
          </a>
        </div>
      </section>
    </main>
  );
}