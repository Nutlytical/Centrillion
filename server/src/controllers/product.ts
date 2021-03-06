import { Request, Response } from "express";

import { CartItemModel, ProductModel, UserModel } from "../models";
import {
  validateProductName,
  validateProductDescription,
  validateProductPrice,
  isProductExist,
} from "../utils/validation/products";

async function products(_: Request, res: Response) {
  try {
    const products = await ProductModel.find();

    return res.json(products);
  } catch (error) {
    console.log(error);
  }
}

async function product(req: Request, res: Response) {
  try {
    let { productId } = req.params;

    const product = await ProductModel.findById(productId);

    isProductExist(res, product);

    return res.json(product);
  } catch (error) {
    console.log(error);
  }
}

async function createProduct(req: Request, res: Response) {
  try {
    let { name, description, price } = req.body;

    name = validateProductName(res, name);
    description = validateProductDescription(res, description);
    price = validateProductPrice(res, price);

    const newProduct = await ProductModel.create({
      name,
      description,
      price,
    });

    return res.json(newProduct);
  } catch (error) {
    console.log(error);
  }
}

async function updateProduct(req: Request, res: Response) {
  try {
    let { productId, price } = req.body;

    price = validateProductPrice(res, price);

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        price,
      },
      { new: true }
    );

    isProductExist(res, updatedProduct);

    return res.json({
      message: "Product has already been updated",
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteProduct(req: Request, res: Response) {
  try {
    let { productId } = req.params;

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    isProductExist(res, deletedProduct);

    const allCartItem = await CartItemModel.find({ product: deletedProduct });

    let users = [];

    for (let cartItem of allCartItem) {
      const deletedCart = await CartItemModel.findByIdAndDelete(cartItem._id);

      const user = await UserModel.findById(deletedCart?.user._id);

      users.push(user);
    }

    for (let user of users) {
      const userCart = await CartItemModel.find({ user: user?._id });

      await UserModel.findByIdAndUpdate(
        user?._id,
        {
          carts: userCart,
        },
        { new: true }
      );
    }

    return res.json({
      message: "Product has already been deleted",
    });
  } catch (error) {
    console.log(error);
  }
}

export { products, product, createProduct, updateProduct, deleteProduct };
