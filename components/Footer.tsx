import { BRAND } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="border-t border-amber-500/20 bg-black py-8 text-center text-sm text-zinc-400">
      <p className="font-semibold text-amber-400">{BRAND.name}</p>
      <p className="mt-1">{BRAND.contactText}</p>
      <p className="mt-2 text-zinc-500">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
    </footer>
  );
}
