import cors from "cors";
import express, { json, urlencoded } from "express";
import getEnv from "./config/get-env";
import db from "./database";
import authenticateUser from "./middleware/authenticate-user";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import areaRouter from "./routes/area.route";

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

const port = getEnv("port") || 3001;

app.all("*", authenticateUser);

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/area", areaRouter);

app.listen(port, () => {
  console.log(`⚡ Server is listening on port ${port}`);
  db.connect();
});
