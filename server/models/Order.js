const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },
                quantity: { type: Number, default: 1 }
            }
        ],
        totalAmount: { type: Number, required: true },
        status: {
            type: String,
            enum: ["Pending", "Delivered"],
            default: "Pending"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
