import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { parseMemberToken } from "@/lib/member-auth";
import LaunchSections from "./LaunchSections";

export default async function MemberHomePage() {
  const token = (await cookies()).get("mf_session")?.value;
  Token(token);
  const user = parseMemberToken(token);
  if (!user) redirect("/sign-in");

  return (
    <main className="space-y-4 p-4">
      <LaunchSections username={user.username} />
    </main>
  );
}
