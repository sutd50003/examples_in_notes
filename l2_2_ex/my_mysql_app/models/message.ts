import * as mysql from 'mysql2/promise';
import db from './db';

const tableName = 'message';

export class Message {
  msg: string;
  time: Date;

  constructor(msg: string, time: Date) {
    this.msg = msg;
    this.time = time;
  }
}

export async function sync(): Promise<void> {
  try {
    await db.pool.query(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        msg VARCHAR(255),
        time DATETIME PRIMARY KEY
      )
    `);
  } catch (error) {
    console.error('database connection failed. ' + error);
    throw error;
  }
}

export async function all(): Promise<Message[]> {
  try {
    const [rows] = await db.pool.query<mysql.RowDataPacket[]>(`
      SELECT msg, time FROM ${tableName}
    `);
    const list: Message[] = [];
    console.log(rows.length);
    for (const row of rows) {
      const message = new Message(row.msg as string, row.time as Date);
      list.push(message);
    }
    return list;
  } catch (error) {
    console.error('database connection failed. ' + error);
    throw error;
  }
}

export async function insertOne(message: Message): Promise<void> {
  try {
    await db.pool.query(
      `INSERT INTO ${tableName} (msg, time) VALUES (?, ?)`,
      [message.msg, message.time]
    );
  } catch (error) {
    console.error('database connection failed. ' + error);
    throw error;
  }
}

export async function insertMany(messages: Message[]): Promise<void> {
  for (const message of messages) {
    await insertOne(message);
  }
}

export async function deleteOne(message: Message): Promise<void> {
  try {
    await db.pool.query(
      `DELETE FROM ${tableName} where time = ?`,
      [message.time]
    );
  } catch (error) {
    console.error('database connection failed. ' + error);
    throw error;
  }
}