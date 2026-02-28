import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;

export const db = DATABASE_URL ? postgres(DATABASE_URL, { ssl: "require" }) : null;

export async function ensureDb() {
  if (!db) throw new Error("MISSING_DATABASE_URL");

  await db`
    CREATE TABLE IF NOT EXISTS members (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      bank_account TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'active',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await db`
    CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      member_id INT REFERENCES members(id),
      tx_type TEXT NOT NULL,
      amount NUMERIC(14,2) NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      note TEXT DEFAULT '',
      approved_by TEXT DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
}
