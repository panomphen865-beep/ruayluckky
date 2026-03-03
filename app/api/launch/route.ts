// app/api/launch/route.ts
// Create user if needed -> request launch URL -> return URL

import { NextRequest, NextResponse } from "next/server";
import { askmebetPost } from "@/lib/askmebet";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const username = body?.username;
    const gameId = body?.gameID || body?.gameId; // รองรับทั้ง gameID/gameId
    const provider = body?.provider || "PGS";
    const device = body?.device || "desktop";
    const language = body?.language || "th";

    if (!username || !gameId) {
      return NextResponse.json(
        { ok: false, error: "missing_username_or_gameId" },
        { status: 400 }
      );
    }

    // 1) Try create-user first (idempotent pattern)
    await askmebetPost("/common/create-user", {
      username,
      name: username,
      password: "Aa123456!",
    }).catch(() => null); // ถ้ามีอยู่แล้วให้ไปต่อ

    // 2) Launch game
    const launch = await askmebetPost("/common/launch-game", {
      username,
      gameID: gameId,
      provider,
      tab: "Slot",
      language,
      device,
      redirectUrl: process.env.NEXT_PUBLIC_APP_URL
        ? `${process.env.NEXT_PUBLIC_APP_URL}/member/home`
        : "https://my-web-six-umber.vercel.app/member/home",
    });

    const url = launch?.data?.url || launch?.data?.uri;
    if (!url) {
      return NextResponse.json(
        { ok: false, error: "launch_url_not_found", raw: launch },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, url });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "launch_failed" },
      { status: 500 }
    );
  }
}
