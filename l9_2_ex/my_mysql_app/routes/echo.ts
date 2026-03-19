import express, { Request, Response, NextFunction } from 'express';
import * as model from '../models/message';
var router = express.Router();

/* GET echo listing. */
/* API call only, not for approach 1 or 2.
router.get('/:msg', async function(req: Request, res: Response, next: NextFunction): Promise<void> {
    const msg = req.params.msg;
    const message = new model.Message(msg, new Date());
    await model.insertMany([message]);
    const messages = await model.all();
    console.log(messages);
    res.send(`${JSON.stringify(messages)}`);
});
*/


/* for approach 1
router.get('/', async function(req: Request, res: Response, next: NextFunction): Promise<void> {
    const messages = await model.all();
    res.render(`echoform`, { 'title': "Echo App",'messages': messages});
});

router.post('/submit', async function(req: Request, res: Response, next: NextFunction): Promise<void> {
    const msg = req.body.message;
    const message = new model.Message(msg, new Date());
    await model.insertMany([message]);
    const messages = await model.all();
    res.render(`echoform`, { 'title': "Echo App", 'messages': messages});
});
*/


router.get('/', async function(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.render(`echoajax`, { 'title': "Echo App"});
});

router.get('/all', async function(req: Request, res: Response, next: NextFunction): Promise<void> {
    const messages = await model.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.send(`${JSON.stringify(messages)}`);
});



router.post('/submit/', async function(req: Request, res: Response, next: NextFunction): Promise<void> {
    const msg: string = req.body.msg;
    const message = new model.Message(msg, new Date());
    await model.insertMany([message]);
    const messages = await model.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.send(`${JSON.stringify(messages)}`);
});

/* get version of the above
router.get('/submit/:msg', async function(req: Request, res: Response, next: NextFunction): Promise<void> {
    const msg = req.params.msg;
    const message = new model.Message(msg, new Date());
    await model.insertMany([message]);
    const messages = await model.all();
    res.send(`${JSON.stringify(messages)}`);
});
*/


export default router;
