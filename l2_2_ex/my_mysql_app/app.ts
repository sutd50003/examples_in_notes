import path from 'path';
import express, { Application, Request, Response, NextFunction } from 'express';
import createError, { HttpError } from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';

import db from './models/db';
import { sync } from './models/message';
// import * as process from 'process';

process.on('SIGINT', db.cleanup);
process.on('SIGTERM', db.cleanup);

sync();

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import echoRouter from './routes/echo';

const app: Application = express();

app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/echo', echoRouter);

app.use(function(_req: Request, _res: Response, next: NextFunction) {
  next(createError(404));
});

app.use(function(err: HttpError, req: Request, res: Response, _next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;