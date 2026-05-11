import { Db } from 'mongodb';
import { db } from './db';

const collectionName = 'message';

export class Message {
    msg: string;
    time: Date;

    constructor(msg: string, time: Date) {
        this.msg = msg;
        this.time = time;
    }
}

export async function all(): Promise<Message[]> {
    if (!db) {
        throw new Error("Database not initialized");
    }
    try {
        const collection = db.collection(collectionName);
        const cursor = collection.find();
        const messages: Message[] = [];
        while (await cursor.hasNext()) {
            const dbobj = await cursor.next();
            if (dbobj) {
                messages.push(new Message(dbobj.msg, dbobj.time));
            }
        }
        return messages;
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    } 
}

export async function find(p: object): Promise<Message[]> {
    if (!db) {
        throw new Error("Database not initialized");
    }
    try {
        const collection = db.collection(collectionName);
        const cursor = collection.find(p);
        const messages: Message[] = [];
        while (await cursor.hasNext()) {
            const dbobj = await cursor.next();
            if (dbobj) {
                messages.push(new Message(dbobj.msg, dbobj.time));
            }
        }
        return messages;
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    } 
}

export async function insertMany(messages: Message[]): Promise<void> {
    if (!db) {
        throw new Error("Database not initialized");
    }
    try {
        const collection = db.collection(collectionName);
        await collection.insertMany(messages as any);
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    } 
}
