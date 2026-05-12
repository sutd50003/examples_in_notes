import * as fs from 'node:fs/promises';

async function capcat(file: string): Promise<string> {
    const content = await fs.readFile(file, 'utf8');
    const result = content.toUpperCase();
    return result;
}

export = capcat;