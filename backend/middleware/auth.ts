import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default function (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction,
) {
  const token = req.header('Authorization') as string | undefined;
  if (!token) return res.status(401).send('Access Denied');

  try {
    const tokenString = token.startsWith('Bearer ') ? token.slice(7) : token;
    const verified = jwt.verify(tokenString, process.env.JWT_SECRET as string);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}
