import { connectDb } from "@/database";
import { getUserFromToken } from "@/middleware";
import * as routes from "@/routes";
import cors from "cors";
import { config } from "dotenv";
import express, { json, urlencoded } from "express";

config();

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.all("*", getUserFromToken);

app.get("/", (req, res) => {
  return res.status(200).send("Express Server Running");
});
app.use("/auth", routes.authRouter);
app.use("/area", routes.areaRouter);
app.use("/user", routes.userRouter);
app.use("/donation", routes.donationRouter);
app.use("/worker", routes.workerRouter);

const port = process.env.port || 3001;

app.listen(port, () => {
  console.log(`⚡ Server is listening on port ${port}`);
  connectDb();
});
