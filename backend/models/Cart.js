const mongoose = require("mongoose")


const CartSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
        products: [{
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product", // Reference to the Product model (if you have one)
                required: true,
            // }
            },
            quantity:{
                type:Number,
                default: 1
            },
            color:{
                type:String
            },
            size:{
                type:String
            }
        }],
    
    },
{ timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);


