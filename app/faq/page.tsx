import Header from "@/components/Header";
import Footer from "@/components/Footer";

const faqs = [
  { q: "เว็บนี้ใช้ทำอะไร?", a: "ใช้สำหรับโปรโมชัน/สมาชิก/คอนเทนต์ และจัดการหลังบ้าน" },
  { q: "รองรับมือถือไหม?", a: "รองรับแบบ Mobile-first เรียบร้อย" },
  { q: "เพิ่มโปรโมชันเองได้ไหม?", a: "ได้ ผ่านหน้า /admin/promotions (ต่อระบบสิทธิ์แอดมินเพิ่มเติม)" },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold text-amber-400">คำถามพบบ่อย</h1>
        <div className="mt-6 space-y-3">
          {faqs.map((f) => (
            <article key={f.q} className="rounded-xl border border-amber-500/20 bg-zinc-900 p-5">
              <h2 className="font-semibold">{f.q}</h2>
              <p className="mt-2 text-zinc-300">{f.a}</p>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
