// lib/askmebet.ts
// Utility for calling AskMeBet API from server components

const domain = process.env.ASKMEBET_DOMAIN || "";
const agentUsername = process.env.ASKMEBET_AGENT_USERNAME || "";
const key = process.env.ASKMEBET_KEY || "";
const web = process.env.ASKMEBET_WEB || process.env.ASKMEBET_BASE_URL || "";

if (!domain) throw new Error("missing_ASKMEBET_DOMAIN");
if (!agentUsername) throw new Error("missing_ASKMEBET_AGENT_USERNAME");
if (!key) throw new Error("missing_ASKMEBET_KEY");

export async function askmebetPost(path: string, payload: Record<string, any>) {
  const url = `${domain}${path}`;

  const body = {
    ...payload,
    agentUsername,
    key,
    web,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`askmebet request failed: ${res.status} ${text}`);
  }

  return res.json();
}
