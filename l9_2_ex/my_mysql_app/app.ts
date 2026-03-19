import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import * as db from './models/db';
import process from 'process';

process.on('SIGINT', db.cleanup);
process.on('SIGTERM', db.cleanup);

import * as message from './models/message';
message.sync();


import indexRouter from './routes/index';
import usersRouter from './routes/users';
import echoRouter from './routes/echo';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/echo', echoRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction): void {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction): void {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
