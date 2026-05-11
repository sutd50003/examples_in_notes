import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', function(_req: Request, res: Response) {
  res.send('respond with a resource');
});

export default router;