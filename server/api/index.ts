
import { ResponseError } from "server/util/ResponseError";
import express, { Request, Response } from 'express'
const router = express.Router()


router.use('/userss', require('./users'))


router.use((req, res, next) => {
  const error: ResponseError = new Error('Not Found');
  console.log("here we are")
  error.status = 402;
  next(error);
});
