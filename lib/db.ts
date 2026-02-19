import { promises as fs } from "fs";
import path from "path";

export type DbUser = { id: string; email: string; passwordHash: string; role: "USER" | "ADMIN"; createdAt: string };
export type DbPromotion = { id: string; title: string; description: string; active: boolean; createdAt: string };

type DbShape = { users: DbUser[]; promotions: DbPromotion[] };

const DB_PATH = path.join(process.cwd(), "data", "db.json");

async function ensureDb() {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    const seed: DbShape = { users: [], promotions: [] };
    await fs.writeFile(DB_PATH, JSON.stringify(seed, null, 2), "utf8");
  }
}

export async function readDb(): Promise<DbShape> {
  await ensureDb();
  const raw = await fs.readFile(DB_PATH, "utf8");
  return JSON.parse(raw) as DbShape;
}

export async function writeDb(db: DbShape) {
  await ensureDb();
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

export function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
