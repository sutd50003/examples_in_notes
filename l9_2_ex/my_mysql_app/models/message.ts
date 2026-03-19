import * as db from './db';
import { RowDataPacket, ResultSetHeader, FieldPacket } from 'mysql2/promise';


const tableName: string = 'message';

interface MessageRow extends RowDataPacket {
    msg: string;
    time: Date;
}

class Message {
    msg: string;
    time: Date;

    constructor(msg: string, time: Date) {
        this.msg = msg;
        this.time = time;
    }
}


async function sync(): Promise<void> {
    try {
        db.pool.query(`
        CREATE TABLE IF NOT EXISTS ${tableName} (
            msg VARCHAR(255),
            time DATETIME PRIMARY KEY
        )
        `);
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

async function all(): Promise<Message[]> {
    try {

        const [rows]: [MessageRow[], FieldPacket[]] = await db.pool.query<MessageRow[]>(`
            SELECT msg, time FROM ${tableName}
        `);
        var list: Message[] = [];
        console.log(rows.length);
        for (let row of rows) {
            let message = new Message(row.msg, row.time);
            list.push(message);
        }
        return list;
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

async function insertOne(message: Message): Promise<void> {
    try {

        const [rows, fieldDefs]: [ResultSetHeader, FieldPacket[]] = await db.pool.query<ResultSetHeader>(`
            INSERT INTO ${tableName} (msg, time) VALUES (?, ?)
        `, [message.msg, message.time]);
        console.log(rows);
        console.log(fieldDefs);
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}

async function insertMany(messages: Message[]): Promise<void> {
    for (let message of messages) {
        await insertOne(message);
    }
}

async function deleteOne(message: Message): Promise<void> {
    try {
        const [rows, fieldDefs]: [ResultSetHeader, FieldPacket[]] = await db.pool.query<ResultSetHeader>(`
            DELETE FROM ${tableName} where time = ?`, [message.time]);
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
}


export { Message, all, sync, insertOne, insertMany, deleteOne };
