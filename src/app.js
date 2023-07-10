import cors from "cors";
import express, { json, urlencoded } from "express";
import getEnv from "./config/get-env";
import db from "./database";
import authenticateUser from "./middleware/authenticate-user";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import areaRouter from "./routes/area.route";
import donationRouter from "./routes/donation.route";
import workerRouter from "./routes/worker.route";
import getArea from "./middleware/get-area";

const app = express();

app.use(cors({ exposedHeaders: ["Authorization"] }));
app.use(json());
app.use(urlencoded({ extended: false }));

const port = getEnv("port") || 3001;

app.all("*", authenticateUser, getArea);

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/area", areaRouter);
app.use("/donation", donationRouter);
app.use("/worker", workerRouter);

app.listen(port, () => {
  console.log(`⚡ Server is listening on port ${port}`);
  db.connect();
});
