import { Request, Response } from "express";
import { UserModel } from "../../models";
import { clearToken, verifyToken } from "../token";

const isTokenExpired = async (req: Request, res: Response) => {
  const decodedToken = verifyToken(req);

  if (decodedToken) {
    const isTokenExpired = Date.now() / 1000 - decodedToken.exp > 0;

    if (isTokenExpired) {
      const user = await UserModel.findById(decodedToken.userId);

      if (!user) return null;

      user.tokenVersion += 1;

      await user.save();

      clearToken(res);

      return null;
    }
  }

  return decodedToken;
};

const isTokenVersionValid = async (
  res: Response,
  userTokenVersion: number | undefined,
  tokenVersion: string | undefined
) => {
  const isTokenVersionValid = userTokenVersion === tokenVersion;

  if (!isTokenVersionValid) {
    return res.json({
      message: "No Authorized",
    });
  }
};

export { isTokenExpired, isTokenVersionValid };
