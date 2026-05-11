import express, { Router, Request, Response } from 'express';
import { Message, insertMany, all } from '../models/message';

const router: Router = express.Router();

router.get('/:msg', async function(req: Request, res: Response) {
    const msg = req.params.msg;
    const message = new Message(msg, new Date());
    await insertMany([message]);
    const messages = await all();
    res.send(`${JSON.stringify(messages)}`);
});

export default router;
