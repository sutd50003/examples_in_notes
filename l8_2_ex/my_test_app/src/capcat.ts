import { readFile } from 'node:fs/promises';

export const capcat = async (file: string): Promise<string> => {
    const content = await readFile(file, 'utf8');
    return content.toUpperCase();
};