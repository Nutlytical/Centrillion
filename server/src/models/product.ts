import { Schema, SchemaOptions, model } from "mongoose";

const productSchema = new Schema<ProductType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, setDefaultsOnInsert: true } as SchemaOptions
);

export default model<ProductType>("Product", productSchema);
