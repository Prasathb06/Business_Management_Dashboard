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
        const orders = await Order.find()
            .populate("products.productId", "title price")
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
