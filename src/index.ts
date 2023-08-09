import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import cors from "cors";
import hbs from "hbs";
import path from "path";
import { todoRouter } from "./routes/todo";
import { userRouter } from "./routes/user";
import { viewRouter } from "./routes/view";

const PORT = 8080;

const app = express();
app.use(cors());
app.use(json());
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(todoRouter);
app.use(userRouter);
app.use(viewRouter);

hbs.registerPartials(path.join(__dirname, "views/partials"));

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

app.listen(PORT, () => {
  console.log("server is listening on port " + PORT);
});
