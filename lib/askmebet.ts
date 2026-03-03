// lib/askmebet.ts
type Payload = Record<string, any>;

export async function askmebetPost(path: string, payload: Payload) {
const domain = process.env.ASKMEBET_DOMAIN ?? "";
const agentUsername = process.env.ASKMEBET_AGENT_USERNAME ?? "";
const key = process.env.ASKMEBET_KEY ?? "";
const web = process.env.ASKMEBET_WEB ?? "";

// สำคัญ: check ตรงนี้ตอน "เรียกฟังก์ชัน" เท่านั้น
if (!domain) throw new Error("missing_ASKMEBET_DOMAIN");
if (!agentUsername) throw new Error("missing_ASKMEBET_AGENT_USERNAME");
if (!key) throw new Error("missing_ASKMEBET_KEY");

const url = `${domain}${path}`;
const body = { agentUsername, key, web, ...payload };

const res = await fetch(url, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(body),
cache: "no-store",
});

const data = await res.json().catch(() => ({}));
return data;
}
