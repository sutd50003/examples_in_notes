import mysql from 'mysql2';
import { Pool } from 'mysql2/promise';


let pool: Pool = mysql
  .createPool({
    host: "localhost",
    user: "pichu",
    database: "echo",
    password: "pikaP!",
    connectionLimit: 10,
  })
  .promise();


async function cleanup(): Promise<void> {
    await pool.end();
}

export { pool, cleanup };
