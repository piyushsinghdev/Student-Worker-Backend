const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const jobsRoutes = require("./routes/jobs")
const app = express();
const port = 3000;
const cors = require("cors");  // Import cors

// Middleware to parse incoming JSON
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/",jobsRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong, try again later" });
  });
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
