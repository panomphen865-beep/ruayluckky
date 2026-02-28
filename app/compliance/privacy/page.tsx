export default function Page() {
  return (
    <main className="min-h-screen bg-[#0f1115] text-white p-6 md:p-10">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold text-yellow-300">Privacy Policy</h1>
        <p>เอกสารนี้อธิบายการเก็บ ใช้ และจัดการข้อมูลส่วนบุคคลของผู้ใช้</p>
        <ul className="list-disc pl-6 text-zinc-300 space-y-1">
          <li>เก็บข้อมูลเท่าที่จำเป็นต่อการให้บริการ</li>
          <li>ไม่ขายข้อมูลส่วนบุคคลให้บุคคลภายนอก</li>
          <li>ผู้ใช้สามารถร้องขอลบข้อมูลตามสิทธิ์ทางกฎหมายที่เกี่ยวข้อง</li>
        </ul>
      </div>
    </main>
  );
}
