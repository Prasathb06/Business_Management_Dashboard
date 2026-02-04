const Product = require("../models/Product");
const Order = require("../models/Order");

exports.getDashboardStats = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        const deliveredOrders = await Order.countDocuments({
            status: "Delivered"
        });

        const pendingOrders = await Order.countDocuments({
            status: "Pending"
        });

  
        const orders = await Order.find({ status: "Delivered" });

        const totalRevenue = orders.reduce(
            (sum, order) => sum + order.totalAmount,
            0
        );

        res.json({
            totalProducts,
            totalOrders,
            deliveredOrders,
            pendingOrders,
            totalRevenue
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
