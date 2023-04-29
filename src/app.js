import { config } from "dotenv";
import { connectDb } from "@/database";
import { getUserFromToken } from "@/middleware";
import * as routes from "@/routes";
import cors from "cors";
import express, { json, urlencoded } from "express";

config();

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.all("*", getUserFromToken);

app.use("/auth", routes.authRouter);
app.use("/area", routes.areaRouter);
app.use("/chairperson", routes.chairpersonRouter);
app.use("/user", routes.userRouter);
app.use("/worker", routes.workerRouter);

const port = process.env.port || 3001;

app.listen(port, () => {
  console.log(`⚡ Server is listening on port ${port}`);
  connectDb();
});
