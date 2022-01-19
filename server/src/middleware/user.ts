import { Request, Response, NextFunction } from "express";

import { UserModel } from "../models";
import { isTokenExpired, isTokenVersionValid } from "../utils/validation/token";

async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const checkedToken = await isTokenExpired(req, res);

    const user = await UserModel.findById(checkedToken?.userId);

    isTokenVersionValid(res, user?.tokenVersion, checkedToken?.tokenVersion);

    const isAdmin = user?.isAdmin;

    if (!isAdmin) {
      return res.json({
        message: "No Authorized",
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
}

async function isUserLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const checkedToken = await isTokenExpired(req, res);

    const user = await UserModel.findById(checkedToken?.userId);

    if (!user) {
      return res.json({
        message: "No Authorized",
      });
    }

    isTokenVersionValid(res, user?.tokenVersion, checkedToken?.tokenVersion);

    next();
  } catch (error) {
    console.log(error);
  }
}

export { isAdmin, isUserLogin };
