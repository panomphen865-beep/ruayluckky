import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { parseMemberToken } from "@/lib/member-auth";
import Image from "next/image";

const quick = [
  { icon: "🎰", title: "สล็อต", href: "https://fruit-bowl-game.vercel.app" },
  { icon: "🃏", title: "บาคาร่า", href: "#" },
  { icon: "⚽", title: "กีฬา", href: "#" },
  { icon: "💳", title: "ฝากเงิน", href: "/deposit" },
  { icon: "🎁", title: "โปรโมชั่น", href: "/promotion" },
  { icon: "🎉", title: "กิจกรรม", href: "/activities" },
];

const games = ["Fiery Boxing", "Aztec Empire", "Mahjong Gold", "Roma", "Dragon", "Fortune Tiger"];

export default async function MemberHomePage() {
  const token = (await cookies()).get("mf_session")?.value;
  const user = parseMemberToken(token);
  if (!user) redirect("/sign-in");

  return (
    <main className="min-h-screen bg-[#12070b] text-white p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-4">
        <header className="rounded-2xl border border-red-700/40 bg-gradient-to-r from-[#5a0b10] to-[#2a070a] p-4">
          <h1 className="text-2xl font-bold text-yellow-300">สวัสดี {user.username}</h1>
          <p className="text-sm text-zinc-200">หน้าเล่นของลูกค้า • เลือกเกม ฝากเงิน โปรโมชั่น กิจกรรม</p>
        </header>

        <section className="rounded-2xl border border-red-700/40 bg-black/30 p-2 overflow-hidden">
          <Image src="/assets/ruayluckky/banner/slide-01.jpg" alt="banner" width={1200} height={420} className="h-auto w-full rounded-xl object-cover" />
        </section>

        <section className="grid grid-cols-3 gap-2 rounded-2xl border border-red-700/40 bg-black/30 p-3 md:grid-cols-6">
          {quick.map((q) => (
            <a key={q.title} href={q.href} className="rounded-xl border border-red-500/30 bg-gradient-to-b from-[#2b0608] to-[#120305] p-2 text-center hover:border-yellow-300/50">
              <div className="text-lg">{q.icon}</div>
              <div className="text-xs font-semibold">{q.title}</div>
            </a>
          ))}
        </section>

        <section className="rounded-2xl border border-red-700/40 bg-black/30 p-4">
          <h2 className="mb-2 text-lg font-bold text-yellow-300">เกมยอดฮิต</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {games.map((g) => (
              <a key={g} href="https://fruit-bowl-game.vercel.app" className="rounded-xl border border-red-500/30 bg-zinc-900/60 p-3">
                <p className="font-semibold">{g}</p>
                <p className="text-xs text-zinc-300">เข้าเล่นทันที</p>
              </a>
            ))}
          </div>
        </section>

        <form action="/api/auth/logout" method="post" className="pb-6">
          <button className="rounded-xl bg-red-600 px-4 py-2 font-semibold">ออกจากระบบ</button>
        </form>
      </div>
    </main>
  );
}
