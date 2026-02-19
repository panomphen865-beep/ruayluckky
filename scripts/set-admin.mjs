import fs from "fs";
import path from "path";

const email = process.argv[2];
if (!email) {
  console.log("Usage: node scripts/set-admin.mjs your@email.com");
  process.exit(1);
}

const dbPath = path.join(process.cwd(), "data", "db.json");
if (!fs.existsSync(dbPath)) {
  console.log("DB not found yet. Register a user first.");
  process.exit(1);
}

const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
if (!user) {
  console.log("User not found");
  process.exit(1);
}

user.role = "ADMIN";
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf8");
console.log(`Set ADMIN role for ${email}`);
