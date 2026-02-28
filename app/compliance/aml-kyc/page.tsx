export default function Page() {
  return (
    <main className="min-h-screen bg-[#0f1115] text-white p-6 md:p-10">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold text-yellow-300">AML / KYC Policy</h1>
        <p>บริษัทปฏิบัติตามหลักการป้องกันการฟอกเงิน (AML) และการยืนยันตัวตนลูกค้า (KYC)</p>
        <ul className="list-disc pl-6 text-zinc-300 space-y-1">
          <li>อาจขอเอกสารยืนยันตัวตน/ที่อยู่ตามความเสี่ยงของบัญชี</li>
          <li>ธุรกรรมที่ผิดปกติอาจถูกระงับเพื่อตรวจสอบ</li>
          <li>ข้อมูล KYC จัดเก็บตามข้อกำหนดกฎหมายที่เกี่ยวข้อง</li>
        </ul>
      </div>
    </main>
  );
}
