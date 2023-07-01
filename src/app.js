import cors from "cors";
import { config } from "dotenv";
import express, { json, urlencoded } from "express";
import db from "./database";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import authenticateUser from "./middleware/authenticate-user";

config();

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

const port = process.env.port || 3001;

app.all("*", authenticateUser);

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`⚡ Server is listening on port ${port}`);
  db.connect();
});
