const cors = require("cors");
const env = require("dotenv");
const express = require("express");
const { connectDb } = require("./db");
const { getUserFromToken } = require("./middleware");
const { chairpersonRouter, authRouter } = require("./routes");

env.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.port || 3001;

app.all("*", getUserFromToken);

app.use("/chairperson", chairpersonRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`⚡ Server is listening on port ${port}`);
  connectDb();
});
