import { capcat } from '../src/capcat';
import { writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';

async function setup() {
    await writeFile('./test1.txt', 'hello');
    if (existsSync('./test2.txt')) {
        await rm('./test2.txt');
    }
}

async function teardown() {
    await rm('./test1.txt');
}


describe("capcat tests", () => {
    beforeAll(async () => {
        await setup();
    });

    test ("printing an existing file", async () => {
        const result = await capcat('./test1.txt');
        expect(result).toBe('HELLO');
    });
    
    test ("printing a non-existing file", async () => {
        try {
            await capcat('./test2.txt');
        } catch (e: unknown) {
            const err = e as { code?: string };
            expect(err.code).toBe('ENOENT');
        };
    });
    
    afterAll(async () => {
        await teardown();
    })
})