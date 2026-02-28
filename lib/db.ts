import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;

let client: ReturnType<typeof postgres> | null = null;
try {
  if (DATABASE_URL && DATABASE_URL.includes("@") && !DATABASE_URL.includes("USER:PASSWORD@HOST")) {
    client = postgres(DATABASE_URL, { ssl: "require" });
  }
} catch {
  client = null;
}

export const db = client;

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

  await db`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      role TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await db`
    CREATE TABLE IF NOT EXISTS member_users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      phone TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
}
