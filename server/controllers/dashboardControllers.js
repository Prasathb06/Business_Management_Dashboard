const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

exports.getDashboardStats = async (req, res) => {
    try {
        if (req.user.role === "admin") {
            const totalOrders = await Order.countDocuments();
            const totalProducts = await Product.countDocuments();
            const totalStaff = await User.countDocuments({ role: "staff" });

            const revenue = await Order.aggregate([
                { $match: { status: "Delivered" } },
                { $group: { _id: null, total: { $sum: "$totalAmount" } } },
            ]);

            res.json({
                totalOrders,
                totalProducts,
                totalStaff,
                totalRevenue: revenue[0]?.total || 0,
            });
        } else {
            const assignedOrders = await Order.countDocuments({
                assignedTo: req.user.id,
            });

            const deliveredOrders = await Order.countDocuments({
                assignedTo: req.user.id,
                status: "Delivered",
            });

            res.json({
                assignedOrders,
                deliveredOrders,
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMonthlySales = async (req, res) => {
    try {
        const sales = await Order.aggregate([
            { $match: { status: "Delivered" } },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    total: { $sum: "$totalAmount" },
                },
            },
            { $sort: { "_id": 1 } },
        ]);

        res.json(sales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

