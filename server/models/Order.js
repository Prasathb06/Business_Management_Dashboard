const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },
                quantity: Number
            }
        ],
        status: {
            type: String,
            enum: ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Placed"
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
