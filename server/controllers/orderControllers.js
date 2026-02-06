const Order = require("../models/Order");


exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getOrders = async (req, res) => {
    try {
        let orders;

        if (req.user.role === "admin") {
            orders = await Order.find()
                .populate("products.productId", "title price")
                .populate("assignedTo", "name email")
                .sort({ createdAt: -1 });
        } else {
            orders = await Order.find({ assignedTo: req.user.id })
                .populate("products.productId", "title price")
                .sort({ createdAt: -1 });
        }

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};





exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const allowedStatus = ["Processing", "Shipped", "Delivered", "Cancelled"];
  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(order);
};


exports.assignOrderToStaff = async (req, res) => {
    try {
        const { staffId } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { assignedTo: staffId },
            { new: true }
        );

        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
