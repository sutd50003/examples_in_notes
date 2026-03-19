import express, { Request, Response, NextFunction } from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction): void {
  res.send('respond with a resource');
});

export default router;
