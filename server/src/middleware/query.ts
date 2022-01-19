import { Request, Response, NextFunction } from "express";

import { ProductModel } from "../models";

async function haveProductNameQuery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { name } = req.query;

    if (name) {
      if (typeof name !== "string") return;

      let re = new RegExp(`${name}`);

      const product = await ProductModel.find({
        name: re,
      });

      return res.json(product);
    }

    next();
  } catch (error) {
    console.log(error);
  }
}

export { haveProductNameQuery };
