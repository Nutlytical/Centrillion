import { Schema, SchemaOptions, model } from "mongoose";

const orderItemSchema = new Schema<OrderItemType>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, setDefaultsOnInsert: true } as SchemaOptions
);

export default model<OrderItemType>("OrderItem", orderItemSchema);
