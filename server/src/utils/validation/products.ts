import { Response } from "express";

function validateProductName(res: Response, name: string) {
  let errorMessage = "";

  if (!name) {
    errorMessage = "Name is required.";
  } else if (typeof name !== "string") {
    errorMessage = "Name must be a string.";
  } else if (name.trim().length < 3 || name.trim().length > 30) {
    errorMessage =
      "Username must be at least 3 characters and less than 30 characters.";
  }

  if (errorMessage) {
    return res.json({
      message: errorMessage,
    });
  }

  return name.trim();
}

function validateProductDescription(res: Response, description: string) {
  let errorMessage = "";

  if (!description) {
    errorMessage = "Description is required.";
  } else if (typeof description !== "string") {
    errorMessage = "Description must be a string.";
  } else if (description.trim().length < 3 || description.trim().length > 200) {
    errorMessage =
      "Username must be at least 3 characters and less than 200 characters.";
  }

  if (errorMessage) {
    return res.json({
      message: errorMessage,
    });
  }

  return description.trim();
}

function validateProductPrice(res: Response, price: number) {
  let errorMessage = "";

  if (!price) {
    errorMessage = "Price is required.";
  } else if (typeof price !== "number") {
    errorMessage = "Price must be a number.";
  } else if (price < 1 || price > 100000) {
    errorMessage = "Price must be between 1 - 100,000.";
  }

  if (errorMessage) {
    return res.json({
      message: errorMessage,
    });
  }

  return price;
}

function isProductExist(res: Response, product: ProductType | null) {
  if (!product) {
    return res.json({
      message: "Product not found.",
    });
  }
}

function validateProductId(res: Response, productId: string) {
  let errorMessage = "";

  if (!productId) {
    errorMessage = "Product id is required.";
  } else if (typeof productId !== "string") {
    errorMessage = "Product must be a string.";
  }

  if (errorMessage) {
    return res.json({
      message: errorMessage,
    });
  }

  return productId;
}

export {
  validateProductName,
  validateProductDescription,
  validateProductPrice,
  validateProductId,
  isProductExist,
};
