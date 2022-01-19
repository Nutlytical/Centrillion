import express from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import cookieParser from "cookie-parser";

import { cartRoutes, orderRoutes, productRoutes, userRoutes } from "./routes";

import { config } from "dotenv";
config();

const { PORT, DATABASE } = process.env;

const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const main = async () => {
  try {
    await mongoose.connect(DATABASE!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    app.use("/api/users", userRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/carts", cartRoutes);
    app.use("/api/orders", orderRoutes);

    app.listen(PORT!, () => {
      console.log(`🚀 Server is ready at http://localhost:${PORT!}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
