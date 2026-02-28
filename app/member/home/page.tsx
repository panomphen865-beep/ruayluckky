import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { parseMemberToken } from "@/lib/member-auth";

const cards = [
  { title: "🎮 เข้าเล่นเกม", desc: "เข้าไปเลือกเกมที่ต้องการเล่น", href: "https://fruit-bowl-game.vercel.app" },
  { title: "💳 ฝากเงิน", desc: "ดูบัญชีและแจ้งโอนเงิน", href: "/deposit" },
  { title: "🎁 โปรโมชั่น", desc: "รับสิทธิ์และโบนัสล่าสุด", href: "/promotion" },
  { title: "📣 กิจกรรม", desc: "กิจกรรมพิเศษและของรางวัล", href: "/activities" },
];

export default async function MemberHomePage() {
  const token = (await cookies()).get("mf_session")?.value;
  const user = parseMemberToken(token);
  if (!user) redirect("/sign-in");

  return (
    <main className="min-h-screen bg-[#10070b] text-white p-6 md:p-10">
      <div className="mx-auto max-w-5xl space-y-5">
        <div className="rounded-2xl border border-red-700/40 bg-gradient-to-r from-[#4f090e] to-[#24060a] p-4">
          <h1 className="text-2xl font-bold text-yellow-300">ยินดีต้อนรับ {user.username}</h1>
          <p className="text-sm text-zinc-200">หน้าโฮมลูกค้า: เข้าเล่นเกม ฝากเงิน โปรโมชั่น และกิจกรรม</p>
        </div>

        <section className="grid gap-3 md:grid-cols-2">
          {cards.map((c) => (
            <a key={c.title} href={c.href} className="rounded-2xl border border-red-500/30 bg-zinc-900/60 p-4 hover:border-yellow-300/50">
              <h2 className="text-xl font-bold text-yellow-200">{c.title}</h2>
              <p className="mt-1 text-sm text-zinc-300">{c.desc}</p>
            </a>
          ))}
        </section>

        <form action="/api/auth/logout" method="post">
          <button className="rounded-xl bg-red-600 px-4 py-2 font-semibold">ออกจากระบบ</button>
        </form>
      </div>
    </main>
  );
}
