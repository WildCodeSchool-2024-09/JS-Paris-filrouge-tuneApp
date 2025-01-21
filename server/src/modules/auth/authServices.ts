import argon from "argon2";
import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import type { Secret } from "jsonwebtoken";

const hash = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.password = await argon.hash(req.body.password)
        next();
    }
    catch (error) {
        next(error);
    }
}

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) res.sendStatus(401);
  else {
    const isTokenValid = jwt.verify(token, process.env.APP_SECRET as Secret);
    if (!isTokenValid) res.sendStatus(401);
    else next();
  }
};

export default { hash, isAuth }