import cors from "cors";
import { config } from "dotenv";
import express, { json, urlencoded } from "express";
import { connectDb } from "./db";
import { getUserFromToken } from "./middleware";
import { chairpersonRouter, authRouter } from "./routes";

config();

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

const port = process.env.port || 3001;

app.all("*", getUserFromToken);

app.use("/chairperson", chairpersonRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`⚡ Server is listening on port ${port}`);
  connectDb();
});
