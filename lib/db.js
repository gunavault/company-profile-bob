import 'server-only';
import { createClient } from '@libsql/client';
import { migrate } from './schema';

const globalForDb = globalThis;

function makeClient() {
  const url = process.env.TURSO_DATABASE_URL;
  if (url) {
    return createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
  }
  if (process.env.VERCEL) {
    throw new Error('TURSO_DATABASE_URL belum diset di Environment Variables Vercel.');
  }
  // Lokal: file SQLite biasa
  return createClient({ url: 'file:data/local.db' });
}

function client() {
  if (!globalForDb.__grcDb) globalForDb.__grcDb = makeClient();
  return globalForDb.__grcDb;
}

async function ready() {
  if (!globalForDb.__grcReady) {
    globalForDb.__grcReady = migrate(client()).catch((err) => {
      globalForDb.__grcReady = null;
      throw err;
    });
  }
  return globalForDb.__grcReady;
}

function plain(row) {
  return row ? Object.fromEntries(Object.entries(row)) : null;
}

export async function all(sql, args = []) {
  await ready();
  const rs = await client().execute({ sql, args });
  return rs.rows.map(plain);
}

export async function one(sql, args = []) {
  const rows = await all(sql, args);
  return rows[0] || null;
}

export async function run(sql, args = []) {
  await ready();
  const rs = await client().execute({ sql, args });
  return { changes: rs.rowsAffected, lastId: rs.lastInsertRowid != null ? Number(rs.lastInsertRowid) : null };
}

export async function batch(statements) {
  await ready();
  return client().batch(statements, 'write');
}
