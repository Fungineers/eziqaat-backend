import cors from "cors";
import { config } from "dotenv";
import express, { json, urlencoded } from "express";
import { connectDb } from "@/database";
import { getUserFromToken } from "@/middleware";
import {
  chairpersonRouter,
  authRouter,
  generalSecretaryRouter,
  areaRouter,
} from "@/routes";

config();

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

const port = process.env.port || 3001;

app.all("*", getUserFromToken);

app.use("/auth", authRouter);
app.use("/general-secretary", generalSecretaryRouter);
app.use("/chairperson", chairpersonRouter);
app.use("/area", areaRouter);

app.listen(port, () => {
  console.log(`⚡ Server is listening on port ${port}`);
  connectDb();
});
