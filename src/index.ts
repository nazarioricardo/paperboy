import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { todoRouter } from "./routes/todo";
import { userRouter } from "./routes/user";

const app = express();
app.use(json());
app.use(todoRouter);
app.use(userRouter);

try {
  mongoose.connect(
    "mongodb://127.0.0.1:27017/todo",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("connected to database");
    }
  );
} catch (error) {
  console.log(error);
}

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
