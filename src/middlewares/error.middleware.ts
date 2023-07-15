import HttpException from "exceptions/http.exception";
import { NextFunction, Request, Response } from "express";

const ErrorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "something wrong ";
  res.status(status).send({
    message,
    status,
    error,
  });
};

export default ErrorMiddleware;
