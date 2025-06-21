import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Cria o pool com a connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Passa o pool para o drizzle
export const db = drizzle(pool);
