export default function Page() {
  return (
    <main className="min-h-screen bg-[#0f1115] text-white p-6 md:p-10">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold text-yellow-300">Age Policy (18+)</h1>
        <p>แพลตฟอร์มนี้ให้บริการเฉพาะผู้ใช้ที่มีอายุ 18 ปีขึ้นไป (หรืออายุขั้นต่ำตามกฎหมายท้องถิ่นที่สูงกว่า)</p>
        <ul className="list-disc pl-6 text-zinc-300 space-y-1">
          <li>ผู้ใช้ต้องยืนยันวันเดือนปีเกิดตามความเป็นจริง</li>
          <li>บริษัทสงวนสิทธิ์ขอเอกสารยืนยันอายุเพิ่มเติม</li>
          <li>หากพบว่าผู้ใช้ไม่ถึงเกณฑ์อายุ บริษัทมีสิทธิ์ระงับบัญชีทันที</li>
        </ul>
      </div>
    </main>
  );
}
