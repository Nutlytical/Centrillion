import { Schema, SchemaOptions, model } from "mongoose";

const cartItemSchema = new Schema<cartItemType>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, setDefaultsOnInsert: true } as SchemaOptions
);

export default model<cartItemType>("CartItem", cartItemSchema);
