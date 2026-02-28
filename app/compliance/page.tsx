const items = [
  { href: "/compliance/age-policy", title: "Age Policy (18+)", desc: "นโยบายอายุขั้นต่ำและการยืนยันอายุ" },
  { href: "/compliance/responsible-gaming", title: "Responsible Gaming", desc: "แนวทางเล่นอย่างรับผิดชอบและการจำกัดตนเอง" },
  { href: "/compliance/aml-kyc", title: "AML / KYC Policy", desc: "นโยบายป้องกันฟอกเงินและการยืนยันตัวตน" },
  { href: "/compliance/privacy", title: "Privacy Policy", desc: "นโยบายความเป็นส่วนตัว" },
  { href: "/compliance/terms", title: "Terms & Conditions", desc: "ข้อกำหนดและเงื่อนไขการใช้งาน" },
  { href: "/compliance/company-license", title: "Company & License", desc: "ข้อมูลบริษัทและข้อมูลใบอนุญาต (placeholder)" },
];

export default function CompliancePage() {
  return (
    <main className="min-h-screen bg-[#0f1115] text-white p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-yellow-300">Compliance Center</h1>
        <p className="mt-2 text-zinc-300">ศูนย์เอกสารด้านกฎหมาย/คอมพลายแอนซ์สำหรับการยื่นพาร์ทเนอร์</p>

        <div className="mt-6 grid gap-3">
          {items.map((item) => (
            <a key={item.href} href={item.href} className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-4 hover:border-yellow-400">
              <p className="text-lg font-semibold text-yellow-200">{item.title}</p>
              <p className="text-sm text-zinc-300">{item.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
