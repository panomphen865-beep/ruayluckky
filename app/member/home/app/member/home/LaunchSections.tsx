"use client";

import { useState } from "react";

interface LaunchSectionsProps {
username: string;
}

const quickGames = [
{ icon: "🎰", title: "สล็อต", gameID: "60531c5534d88c344ce9aca9", provider: "PGS" }, // Mahjong Ways
{ icon: "🃏", title: "การ์ด", gameID: "60531c5534d88c344ce9ac98", provider: "PGS" }, // Baccarat Deluxe
{ icon: "🐯", title: "Fortune Tiger", gameID: "6218ca10cc0fd496ed8ae93f", provider: "PGS" },
];

const quickLinks = [
{ icon: "💳", title: "ฝากเงิน", href: "/deposit" },
{ icon: "🎁", title: "โปรโมชั่น", href: "/promotion" },
{ icon: "🎉", title: "กิจกรรม", href: "/activities" },
];

const popularGames = [
{ title: "Mahjong Ways", gameID: "60531c5534d88c344ce9aca9", provider: "PGS" },
{ title: "Fortune Tiger", gameID: "6218ca10cc0fd496ed8ae93f", provider: "PGS" },
{ title: "Candy Burst", gameID: "60531c5534d88c344ce9acb0", provider: "PGS" },
{ title: "Dragon Hatch", gameID: "60531c5534d88c344ce9acaa", provider: "PGS" },
{ title: "Lucky Neko", gameID: "60531c5534d88c344ce9acc4", provider: "PGS" },
{ title: "Rooster Rumble", gameID: "624ebfd6afd3b274dfa8ad39", provider: "PGS" },
];

export default function LaunchSections({ username }: LaunchSectionsProps) {
const [loadingGame, setLoadingGame] = useState<string | null>(null);

const launchGame = async (gameID: string, provider: string) => {
setLoadingGame(gameID);
try {
const res = await fetch("/api/launch", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ username, gameID, provider }),
});

const data = await res.json();

if (data?.ok && (data?.url || data?.uri)) {
window.location.href = data.url || data.uri;
} else {
alert(data?.error || "ไม่สามารถเข้าเกมได้");
}
} catch (e) {
console.error(e);
alert("เกิดข้อผิดพลาดขณะพยายามเข้าเกม");
} finally {
setLoadingGame(null);
}
};

return (
<>
<section className="grid grid-cols-3 gap-2 rounded-2xl border border-red-700/40 bg-black/30 p-3 md:grid-cols-6">
{quickGames.map((q) => (
<button
key={q.title}
disabled={!!loadingGame}
onClick={() => launchGame(q.gameID, q.provider)}
className="rounded-xl border border-red-500/30 bg-gradient-to-b from-[#2b0608] to-[#120305] p-2 text-center hover:border-yellow-300/50"
>
<div className="text-lg">{q.icon}</div>
<div className="text-xs font-semibold">{q.title}</div>
</button>
))}
{quickLinks.map((q) => (
<a
key={q.title}
href={q.href}
className="rounded-xl border border-red-500/30 bg-gradient-to-b from-[#2b0608] to-[#120305] p-2 text-center hover:border-yellow-300/50"
>
<div className="text-lg">{q.icon}</div>
<div className="text-xs font-semibold">{q.title}</div>
</a>
))}
</section>

<section className="rounded-2xl border border-red-700/40 bg-black/30 p-4">
<h2 className="mb-2 text-lg font-bold text-yellow-300">เกมยอดฮิต</h2>
<div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
{popularGames.map((g) => (
<button
key={g.title}
disabled={!!loadingGame}
onClick={() => launchGame(g.gameID, g.provider)}
className="rounded-xl border border-red-500/30 bg-zinc-900/60 p-3"
>
<p className="font-semibold">{g.title}</p>
<p className="text-xs text-zinc-300">เข้าเล่นทันที</p>
</button>
))}
</div>
</section>
</>
);
}
