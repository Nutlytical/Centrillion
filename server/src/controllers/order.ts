import { Request, Response } from "express";

import {
  CartItemModel,
  OrderItemModel,
  OrderModel,
  UserModel,
} from "../models";
import { verifyToken } from "../utils/token";
import { validateStatus } from "../utils/validation/order";

async function userOrders(req: Request, res: Response) {
  try {
    const decodedToken = verifyToken(req);

    const orders = await OrderModel.find({
      user: decodedToken?.userId,
    }).populate({
      path: "orderItems",
    });

    return res.json(orders);
  } catch (error) {
    console.log(error);
  }
}

async function orders(_: Request, res: Response) {
  try {
    const orders = await OrderModel.find()
      .populate({
        path: "orderItems",
      })
      .populate({ path: "user" });

    return res.json(orders);
  } catch (error) {
    console.log(error);
  }
}

async function createOrder(req: Request, res: Response) {
  try {
    const decodedToken = verifyToken(req);

    const user = await UserModel.findById(decodedToken?.userId)
      .populate({
        path: "carts",
        populate: { path: "product" },
      })
      .populate({ path: "orders" });
    const amount = user.carts.reduce(
      (prev: number, cur: cartItemType) =>
        prev + cur.quantity * cur.product.price,
      0
    );

    let orderItems = [];

    for (var cartItem of user.carts) {
      const newOrderItem = await OrderItemModel.create({
        product: cartItem.product,
        quantity: cartItem.quantity,
        user: cartItem.user,
      });
      await CartItemModel.findOneAndDelete(cartItem._id);

      orderItems.push(newOrderItem);
    }

    const newOrder = await OrderModel.create({
      user: user._id,
      orderItems,
      status: "PENDING",
      amount,
    });

    await UserModel.findByIdAndUpdate(
      user._id,
      {
        orders: [...user.orders, newOrder],
        carts: [],
      },
      { new: true }
    );

    const newUserCart = await OrderModel.find({
      user: user?._id,
    }).populate({
      path: "orderItems",
    });

    return res.json(newUserCart);
  } catch (error) {
    console.log(error);
  }
}

async function updateOrder(req: Request, res: Response) {
  try {
    const { orderId, status } = req.body;

    const decodedToken = verifyToken(req);

    const user = await UserModel.findById(decodedToken?.userId);

    const isAdmin = user?.isAdmin;

    const order = await OrderModel.findById(orderId);

    validateStatus(res, isAdmin, status, order?.status);

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      {
        status,
      },
      { new: true }
    );

    return res.json(updatedOrder);
  } catch (error) {
    console.log(error);
  }
}

export { userOrders, orders, createOrder, updateOrder };
