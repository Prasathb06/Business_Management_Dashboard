const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");
const { createProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/productControllers");

router.post("/", auth, checkRole(["admin"]), createProduct);
router.put("/:id", auth, checkRole(["admin"]), updateProduct);
router.delete("/:id", auth, checkRole(["admin"]), deleteProduct);

router.get("/", auth, checkRole(["admin", "staff"]), getProducts);

module.exports = router;
