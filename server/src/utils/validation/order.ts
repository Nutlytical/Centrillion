import { Response } from "express";

function validateStatus(
  res: Response,
  isAdmin: boolean | undefined,
  status: string,
  orderStatus: string
) {
  if (!status) {
    return res.json({
      message: "Status is required.",
    });
  } else if (!orderStatus) {
    return res.json({
      message: "Order id is required.",
    });
  }

  let message = false;

  if (!isAdmin) {
    if (status !== "CANCEL_BY_CUSTOMER") {
      message = true;
    } else if (orderStatus !== "PENDING") {
      message = true;
    }
  } else if (
    ![
      "PENDING",
      "CANCEL_BY_CUSTOMER",
      "IN_PROGRESS",
      "CANCEL_BY_ADMIN",
      "DONE",
    ].includes(status)
  ) {
    message = true;
  }

  if (message) {
    return res.json({
      message: "Sorry can not proceed.",
    });
  }
}

export { validateStatus };
