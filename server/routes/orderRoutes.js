const express = require("express");
const { createOrder, getOrders, updateOrderStatus } = require("../controllers/orderControllers");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createOrder);
router.get("/", getOrders);
router.put("/:id", updateOrderStatus);

module.exports = router;
