import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', function(req: Request, res: Response) {
  res.send('respond with a resource');
});

export default router;
