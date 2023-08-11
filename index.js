const colors = require("colors");
const { getEnv } = require("./src/config");
const express = require("express");
const db = require("./src/database");
const cors = require("cors");
const { authenticateUser, getArea } = require("./src/middleware");
const workerRouter = require("./src/routes/worker.route");
const donorRouter = require("./src/routes/donor.route");
const donationRouter = require("./src/routes/donation.route");
const areaRouter = require("./src/routes/area.route");
const authRouter = require("./src/routes/auth.route");
const userRouter = require("./src/routes/user.route");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./doc.json");

// Create an express app
const app = express();

// Apply middleware
app.use(cors({ exposedHeaders: ["Authorization"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Custom middleware
app.all("*", authenticateUser, getArea);

// Routes
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/area", areaRouter);
app.use("/donation", donationRouter);
app.use("/worker", workerRouter);
app.use("/donor", donorRouter);

// API docs
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Use the dynamic port, else default to 3000
const port = getEnv("PORT") || 3001;

// Make the app listen to the port specified
app.listen(port, () => {
  console.clear();
  console.log(colors.green.bold(`+ Server listening on port ${port}`));
  db.connect();
});
