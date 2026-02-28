import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hasValidAdminSession } from "@/lib/admin-store";
import AdminLivePanel from "./AdminLivePanel";

export default async function AdminPage() {
  const token = (await cookies()).get("admin_session")?.value;
  if (!hasValidAdminSession(token)) redirect("/admin-login");

  return (
    <main className="min-h-screen bg-[#0d1020] text-white p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-5">
        <h1 className="text-3xl font-bold text-yellow-300">หลังบ้านผู้ดูแลระบบ (Protected)</h1>
        <p className="text-zinc-300">คำนวณสดได้ และรีเซ็ตอัตโนมัติรายวัน พร้อมบันทึกว่าใครทำรายการ</p>
        <AdminLivePanel />
      </div>
    </main>
  );
}
