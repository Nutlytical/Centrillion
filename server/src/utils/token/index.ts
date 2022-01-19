import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { config } from "dotenv";
config();

const { COOKIE_NAME, COOKIE_SECRET } = process.env;

const createToken = (userId: string, tokenVersion: number) => {
  return jwt.sign({ userId, tokenVersion }, COOKIE_SECRET!, {
    expiresIn: "2h",
  });
};

const sendToken = (res: Response, token: string) => {
  res.cookie(COOKIE_NAME!, token, { httpOnly: true });
};

const clearToken = (res: Response) => {
  res.clearCookie(COOKIE_NAME!).send();
};

const verifyToken = (req: Request) => {
  const token = req.cookies[COOKIE_NAME!];

  const decodedToken = jwt.verify(token, COOKIE_SECRET!) as TokenType | null;

  return decodedToken;
};

export { createToken, sendToken, clearToken, verifyToken };
