import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/:msg', (req: Request, res: Response) => {
  const msg = req.params.msg;
  res.send(`${msg}`);
});

export default router;