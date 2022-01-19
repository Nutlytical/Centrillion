import { Request, Response } from "express";

import { CartItemModel, UserModel } from "../models";
import { verifyToken } from "../utils/token";
import { validateQuantity } from "../utils/validation/cart";
import { validateProductId } from "../utils/validation/products";

async function userCart(req: Request, res: Response) {
  try {
    const decodedToken = verifyToken(req);

    const cart = await CartItemModel.find({
      user: decodedToken?.userId,
    }).populate({
      path: "product",
    });

    return res.json(cart);
  } catch (error) {
    console.log(error);
  }
}

async function addToCart(req: Request, res: Response) {
  try {
    let { productId, quantity } = req.body;

    productId = validateProductId(res, productId);
    quantity = validateQuantity(res, quantity);

    const decodedToken = verifyToken(req);

    const user = await UserModel.findById(decodedToken?.userId);

    const userCart = await CartItemModel.find({ user: decodedToken?.userId });

    const cartItemIndex = userCart.findIndex((cartItem) => {
      return cartItem.product.toString() === productId;
    });

    if (cartItemIndex > -1) {
      await CartItemModel.findByIdAndUpdate(
        userCart[cartItemIndex]._id,
        {
          quantity: userCart[cartItemIndex].quantity + quantity,
        },
        { new: true }
      );
    } else {
      const newCartItem = await CartItemModel.create({
        user: decodedToken?.userId,
        quantity,
        product: productId,
      });

      await UserModel.findByIdAndUpdate(
        user?._id,
        {
          carts: [...userCart, newCartItem],
        },
        { new: true }
      );
    }

    const newUserCart = await CartItemModel.find({ user: user?._id }).populate({
      path: "product",
    });

    return res.json(newUserCart);
  } catch (error) {
    console.log(error);
  }
}

async function deleteCartItem(req: Request, res: Response) {
  try {
    const { productId } = req.params;

    const decodedToken = verifyToken(req);

    const user = await UserModel.findById(decodedToken?.userId);

    const deleteCartItem = await CartItemModel.findOneAndDelete({
      product: productId,
    });

    if (!deleteCartItem) {
      return res.json({
        message: "Sorry can not proceed. Please try again",
      });
    }

    await UserModel.findByIdAndUpdate(
      user?._id,
      {
        carts: user?.carts.filter(
          (cartItem: cartItemType) => cartItem.toString() !== deleteCartItem._id
        ),
      },
      { new: true }
    );

    const newUserCart = await CartItemModel.find({
      user: user?._id,
    }).populate({
      path: "product",
    });

    return res.json(newUserCart);
  } catch (error) {
    console.log(error);
  }
}

export { userCart, addToCart, deleteCartItem };
