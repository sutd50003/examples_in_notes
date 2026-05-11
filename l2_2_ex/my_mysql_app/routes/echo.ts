import { Router, Request, Response } from 'express';
import { Message, all, insertMany } from '../models/message';

const router = Router();

router.get('/:msg', async function(req: Request, res: Response) {
  const msg = req.params.msg;
  const message = new Message(msg, new Date());
  await insertMany([message]);
  const messages = await all();
  console.log(messages);
  res.send(`${JSON.stringify(messages)}`);
});

export default router;