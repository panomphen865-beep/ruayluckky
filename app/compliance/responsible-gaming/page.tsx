export default function Page() {
  return (
    <main className="min-h-screen bg-[#0f1115] text-white p-6 md:p-10">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold text-yellow-300">Responsible Gaming</h1>
        <p>เราให้ความสำคัญกับการใช้งานอย่างรับผิดชอบ ผู้ใช้ควรเล่นเพื่อความบันเทิงเท่านั้น</p>
        <ul className="list-disc pl-6 text-zinc-300 space-y-1">
          <li>ตั้งงบประมาณและเวลาการใช้งานล่วงหน้า</li>
          <li>หากเริ่มควบคุมไม่ได้ ให้หยุดพักทันที</li>
          <li>สามารถขอจำกัดบัญชีตนเอง (Self-Exclusion) ผ่านฝ่ายซัพพอร์ต</li>
        </ul>
      </div>
    </main>
  );
}
