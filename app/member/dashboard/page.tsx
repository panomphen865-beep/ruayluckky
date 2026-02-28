import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { parseMemberToken } from "@/lib/member-auth";

export default async function MemberDashboard() {
  const token = (await cookies()).get("mf_session")?.value;
  const user = parseMemberToken(token);
  if (!user) redirect("/sign-in");

  return (
    <main className="min-h-screen bg-[#0d1020] text-white p-6 md:p-10">
      <div className="mx-auto max-w-4xl space-y-4">
        <h1 className="text-3xl font-bold text-yellow-300">Member Dashboard</h1>
        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-4 space-y-2">
          <p><strong>ผู้ใช้:</strong> {user.username}</p>
          <p><strong>เบอร์:</strong> {user.phone}</p>
        </div>

        <form action="/api/auth/logout" method="post">
          <button className="rounded-xl bg-red-600 px-4 py-2 font-semibold">ออกจากระบบ</button>
        </form>
      </div>
    </main>
  );
}
