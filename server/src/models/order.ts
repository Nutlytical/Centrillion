import { Schema, SchemaOptions, model } from "mongoose";

enum StatusType {
  pending = "PENDING",
  inProgress = "IN_PROGRESS",
  cancelByCustomer = "CANCEL_BY_CUSTOMER",
  cancelByAdmin = "CANCEL_BY_ADMIN",
  done = "DONE",
}

const orderSchema = new Schema<OrderType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "OrderItem",
        required: true,
      },
    ],
    status: {
      type: String,
      enum: StatusType,
      default: [StatusType.pending],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, setDefaultsOnInsert: true } as SchemaOptions
);

export default model<OrderType>("Order", orderSchema);
