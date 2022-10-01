import { NextFunction, Request, Response } from 'express';

export default (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log('err ~ error.middleware', err);
  const [code, message] = err.message.split('|');

  if (!message) {
    return res.status(500).json({ message: 'Unhandled exception!' });
  }

  return res.status(Number(code)).json({ message });
};
