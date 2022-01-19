import { Schema, SchemaOptions, model } from "mongoose";

const userSchema = new Schema<UserType>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },
    carts: [
      {
        type: Schema.Types.ObjectId,
        ref: "CartItem",
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true, setDefaultsOnInsert: true } as SchemaOptions
);

export default model<UserType>("User", userSchema);
