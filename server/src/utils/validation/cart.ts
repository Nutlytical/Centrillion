import { Response } from "express";

function validateQuantity(res: Response, quantity: number) {
  let errorMessage = "";

  if (!quantity) {
    errorMessage = "Quantity is required.";
  } else if (typeof quantity !== "number") {
    errorMessage = "Quantity type must be a number.";
  } else if (quantity < 0) {
    errorMessage = "Price must be greater than zero.";
  }

  if (errorMessage) {
    return res.json({
      message: errorMessage,
    });
  }

  return quantity;
}

export { validateQuantity };
