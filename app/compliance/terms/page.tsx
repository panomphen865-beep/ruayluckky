export default function Page() {
  return (
    <main className="min-h-screen bg-[#0f1115] text-white p-6 md:p-10">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold text-yellow-300">Terms & Conditions</h1>
        <p>การใช้งานแพลตฟอร์มถือว่าผู้ใช้ยอมรับข้อกำหนดและเงื่อนไขฉบับนี้</p>
        <ul className="list-disc pl-6 text-zinc-300 space-y-1">
          <li>ผู้ใช้ต้องให้ข้อมูลที่ถูกต้องและเป็นปัจจุบัน</li>
          <li>บริษัทมีสิทธิ์ระงับบัญชีที่ใช้งานผิดเงื่อนไข</li>
          <li>บริษัทอาจปรับปรุงเงื่อนไขโดยประกาศบนเว็บไซต์</li>
        </ul>
      </div>
    </main>
  );
}
