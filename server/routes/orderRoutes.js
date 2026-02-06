const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");
const { createOrder, getOrders, updateOrderStatus, assignOrderToStaff, deleteOrder } = require("../controllers/orderControllers");


router.get("/", auth, checkRole(["admin", "staff"]), getOrders);


router.post("/", auth, checkRole(["admin"]), createOrder);
router.put("/assign/:id", auth, checkRole(["admin"]), assignOrderToStaff);
router.put("/:id", auth, checkRole(["admin", "staff"]), updateOrderStatus);
router.delete("/:id", auth, checkRole(["admin"]), deleteOrder);

module.exports = router;

