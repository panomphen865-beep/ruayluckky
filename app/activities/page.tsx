export default function ActivitiesPage() {
  return (
    <main className="min-h-screen bg-[#0f1115] text-white p-6 md:p-10">
      <div className="mx-auto max-w-4xl space-y-4">
        <h1 className="text-3xl font-bold text-yellow-300">กิจกรรม</h1>
        <p className="text-zinc-300">รวมกิจกรรมพิเศษรายสัปดาห์/รายเดือนสำหรับสมาชิก</p>
        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-xl border border-zinc-700 bg-zinc-900/70 p-4">
            <h2 className="font-bold">กิจกรรมฝากต่อเนื่อง 3 วัน</h2>
            <p className="text-sm text-zinc-300">ฝากครบเงื่อนไข รับโบนัสเพิ่มตามระดับสมาชิก</p>
          </article>
          <article className="rounded-xl border border-zinc-700 bg-zinc-900/70 p-4">
            <h2 className="font-bold">กิจกรรมชวนเพื่อน</h2>
            <p className="text-sm text-zinc-300">ชวนเพื่อนสมัครและมียอดใช้งาน รับเครดิตพิเศษ</p>
          </article>
        </div>
      </div>
    </main>
  );
}
