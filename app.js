const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const cors = require("cors");
// import File
const bookRoutes = require("./src/routes/bookRoutes.js");
const authRoutes = require("./src/routes/authRoutes.js");
const errorHandler = require("./src/Middleware/errorMiddleware.js");
// Load Config
dotEnv.config({ path: "./config/config.env" });
const app = express();

app.use(cors());
// Routes
app.use(bodyParser.json());
// errorMiddleware
app.use(errorHandler);
// Define a root route
app.get("/", (req, res) => {
  res.send("Hello World from Express.js");
});
app.use("/books", bookRoutes);
app.use("/login", authRoutes);
// Select a port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
