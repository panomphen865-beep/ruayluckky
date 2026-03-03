import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { parseMemberToken } from "@/lib/member-auth";
import Image from "next/image";
import LaunchSections from "./LaunchSections";

// quick/game lists are now rendered within a client-side LaunchSections component

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

        {/* game launch sections (quick links + popular games) */}
        <LaunchSections username={user.username} />

        <form action="/api/auth/logout" method="post" className="pb-6">
          <button className="rounded-xl bg-red-600 px-4 py-2 font-semibold">ออกจากระบบ</button>
        </form>
      </div>
    </main>
  );
}
