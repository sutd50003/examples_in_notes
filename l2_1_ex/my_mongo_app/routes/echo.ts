import express, { Router, Request, Response } from 'express';
import { Message, insertMany, all, find } from '../models/message';

const router: Router = express.Router();

// listening on localhost:3000/echo/hello where hello will be bound to msg
router.get('/:msg', async function(req: Request, res: Response) {
    const msg = req.params.msg;
    const message = new Message(msg, new Date());
    await insertMany([message]); // mongo add _id to message
    // const messages = await all();
    const messages = await find( { 'msg' : msg } ); // retrieve back, no _id
    res.send(`${JSON.stringify(messages)}`);
    // res.send(`${JSON.stringify(message)}`)
});

export default router;
