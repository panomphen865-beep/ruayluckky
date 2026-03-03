"use client";

import { useState } from "react";

type Props = { username: string };

const games = [
  { title: "Mahjong Ways", gameID: "60531c5534d88c344ce9aca9", provider: "PGS" },
  { title: "Fortune Tiger", gameID: "6218ca10cc0fd496ed8ae93f", provider: "PGS" },
  { title: "Rooster Rumble", gameID: "624ebfd6afd3b274dfa8ad39", provider: "PGS" },
];

export default function LaunchSections({ username }: Props) {
  const [loading, setLoading] = useState<string | null>(null);

  const launchGame = async (gameID: string, provider: string) => {
    setLoading(gameID);
    try {
      const res = await fetch("/api/launch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, gameID, provider }),
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        alert(data?.error || "เปิดเกมไม่สำเร็จ");
        return;
      }

      const url = data?.url || data?.uri;
      if (!url) {
        alert("ไม่พบ URL เกม");
        return;
      }

      window.location.href = url;
    } catch (e) {
      console.error(e);
      alert("เกิดข้อผิดพลาด");
    } finally {
      setLoading(null);
    }
  };

  return (
    <section className="rounded-2xl border border-red-700/40 bg-black/30 p-4">
      <h2 className="mb-2 text-lg font-bold text-yellow-300">เกมยอดฮิต</h2>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        {games.map((g) => (
          <button
            key={g.gameID}
            onClick={() => launchGame(g.gameID, g.provider)}
            disabled={!!loading}
            className="rounded-xl border border-red-500/30 bg-zinc-900/60 p-3 text-left"
          >
            <p className="font-semibold">{g.title}</p>
            <p className="text-xs text-zinc-300">
              {loading === g.gameID ? "กำลังเข้าเกม..." : "เข้าเล่นทันที"}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
