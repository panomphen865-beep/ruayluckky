import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-store";
import UsersManager from "./users-manager";

export default async function AdminUsersPage() {
  const token = (await cookies()).get("admin_session")?.value;
  const me = getAdminSession(token);
  if (!me) redirect("/admin-login");
  if (me.role !== "owner") redirect("/admin");

  return (
    <main className="min-h-screen bg-[#0d1020] text-white p-6 md:p-10">
      <div className="mx-auto max-w-5xl space-y-4">
        <h1 className="text-3xl font-bold text-yellow-300">จัดการแอดมิน</h1>
        <UsersManager />
      </div>
    </main>
  );
}
