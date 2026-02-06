const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getDashboardStats, getMonthlySales } = require("../controllers/dashboardController");

router.get("/", auth, getDashboardStats);
router.get("/sales", auth, checkRole(["admin"]), getMonthlySales);

module.exports = router;
