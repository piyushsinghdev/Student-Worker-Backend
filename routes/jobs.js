const express = require("express");
const { jobsController } = require("../controllers/jobsController");

const router = express.Router();

router.get("/jobs",jobsController);

module.exports = router;
