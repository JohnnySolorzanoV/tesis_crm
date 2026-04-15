const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:admin1234@localhost:5432/crm_experta',
});

async function connect() {
  return pool.connect();
}

async function executeSQL(text, params = []) {
  const client = await connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

async function testConnection() {
  const client = await connect();
  try {
    await client.query('SELECT 1');
  } finally {
    client.release();
  }
}

module.exports = {
  connect,
  executeSQL,
  testConnection,
  pool,
};
