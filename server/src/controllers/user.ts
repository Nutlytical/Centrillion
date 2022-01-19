import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { UserModel } from "../models";
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../utils/validation/user";
import {
  clearToken,
  createToken,
  sendToken,
  verifyToken,
} from "../utils/token";
import { isTokenVersionValid } from "../utils/validation/token";

async function signUp(req: Request, res: Response) {
  try {
    let { username, email, password } = req.body;

    username = validateUsername(res, username);
    email = validateEmail(res, email);
    password = validatePassword(res, password);

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({
        message: "This Email is already exists, please sign in instead.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = createToken(newUser._id, newUser.tokenVersion);

    sendToken(res, token);

    res.json({
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    console.log(error);
  }
}

async function signIn(req: Request, res: Response) {
  try {
    let { email, password } = req.body;

    email = validateEmail(res, email);
    password = validatePassword(res, password);

    const user = await UserModel.findOne({ email })
      .populate({
        path: "carts",
        populate: { path: "product" },
      })
      .populate({
        path: "orders",
        populate: { path: "orderItems" },
      });

    if (!user) {
      return res.json({
        message: "Email or password is invalid",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({
        message: "Email or password is invalid",
      });
    }

    const token = createToken(user._id, user.tokenVersion);

    sendToken(res, token);

    res.json({
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      carts: user.carts,
      orders: user.orders,
    });
  } catch (error) {
    console.log(error);
  }
}

async function signOut(req: Request, res: Response) {
  try {
    const checkedToken = verifyToken(req);

    const user = await UserModel.findById(checkedToken?.userId);

    isTokenVersionValid(res, user?.tokenVersion, checkedToken?.tokenVersion);

    if (user) user.tokenVersion += 1;

    await user?.save();

    return clearToken(res);
  } catch (error) {
    console.log(error);
  }
}

export { signUp, signIn, signOut };
