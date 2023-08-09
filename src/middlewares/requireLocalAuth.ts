import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { IUser } from "../utils/types";

const requireLocalAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err: Error, user: IUser, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(422).send(info);
    }
    req.body.user = user;
    next();
  })(req, res, next);
};

export default requireLocalAuth;
