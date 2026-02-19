import Link from "next/link";
import { BRAND } from "@/lib/brand";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-500/20 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-extrabold tracking-wide">
          <span className="text-amber-400">{BRAND.primary}</span>
          <span className="text-white">{BRAND.secondary}</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-300">
          <Link href="/promotions" className="hover:text-amber-300">โปรโมชัน</Link>
          <Link href="/faq" className="hover:text-amber-300">คำถามพบบ่อย</Link>
          <Link href="/login" className="hover:text-amber-300">เข้าสู่ระบบ</Link>
          <Link href="/register" className="hover:text-amber-300">สมัครสมาชิก</Link>
          <Link href="/admin/promotions" className="hover:text-amber-300">หลังบ้าน</Link>
        </nav>
      </div>
    </header>
  );
}
