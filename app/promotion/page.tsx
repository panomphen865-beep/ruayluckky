const promotions = [
  { title: "สมาชิกใหม่รับโบนัสทันที", detail: "โบนัสต้อนรับ + เครดิตเริ่มต้น เมื่อสมัครและยืนยันบัญชี" },
  { title: "คืนยอดเสียรายสัปดาห์", detail: "รับเครดิตคืนทุกสัปดาห์ ตามเงื่อนไขโปรโมชั่น" },
  { title: "แนะนำเพื่อน รับค่าคอม", detail: "ชวนเพื่อนสมัครและใช้งาน รับค่าคอมตามระดับสมาชิก" },
];

export default function PromotionPage() {
  return (
    <main className="min-h-screen bg-[#0f1115] text-white p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-yellow-300">โปรโมชั่น</h1>
        <p className="mt-2 text-zinc-300">อัปเดตสิทธิพิเศษและแคมเปญล่าสุดสำหรับสมาชิก</p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {promotions.map((p) => (
            <article key={p.title} className="rounded-2xl border border-red-700/60 bg-gradient-to-br from-[#5c090e] to-[#2a060a] p-4">
              <h3 className="text-lg font-bold text-yellow-200">{p.title}</h3>
              <p className="mt-1 text-sm text-zinc-200">{p.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
