export default function SectionPage({ title, desc }: { title: string; desc: string }) {
  return (
    <main className="min-h-screen bg-[#0d1020] text-white p-6 md:p-10">
      <div className="mx-auto max-w-5xl space-y-4">
        <h1 className="text-3xl font-bold text-yellow-300">{title}</h1>
        <p className="text-zinc-300">{desc}</p>
        <a href="/admin" className="inline-block rounded-lg bg-cyan-600 px-4 py-2 font-semibold">กลับหน้าแดชบอร์ด</a>
      </div>
    </main>
  );
}
