import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.port || 3001;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
