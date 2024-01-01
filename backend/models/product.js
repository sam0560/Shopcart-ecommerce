const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please enter product name"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    price: {
        type: Number,
        require: [true, "Please enter product price"],
        maxLength: [5, "Product name cannot exceed 5 characters"],
        default: 0.0
    },
    description: {
        type: String,
        require: [true, "Please enter product description"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                require: true
            },
            url: {
                type: String,
                require: true
            }
        }
    ],
    category: {
        type: String,
        require: [true, "Please select category for this product"],
        enum: {
            values: [
                'Electronics',
                'Camera',
                'Laptop',
                'Accesories',
                'Headphone',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home',
            ],
            message: "Please select correct category for product"
        }
    },
    seller: {
        type: String,
        require: [true, "Please enter product seller name"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [5, "Product stock cannot exceed 5"],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    review: [
        {
            name: {
                type: String,
                require: true
            },
            rating: {
                type: Number,
                require: true
            },
            comment: {
                type: String,
                require: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);