const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler');
const catchAsynError = require('../middlewares/catchAsynError')

// Importing api feature
const APIFeatures = require('../utils/apiFeatures');

// Create new product => /api/v1/admin/product/new
exports.newProduct = catchAsynError (async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})


//  Get all products => /api/v1/products?keyword=apple
exports.getProducts = catchAsynError( async (req, res, next) => {

    const resPerPage = 4;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
                    .Search()
                    .filter()
                    .pagination(resPerPage)
    // const products = await Product.find();
    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        products
    })
})


// Get single product detauls => /api/v1/product/:id
exports.getSingleProduct = catchAsynError( async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product
    })

})

// Update Product => /api/v1/admin/product/:id
exports.updateProduct = catchAsynError( async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true,
        product
    })
})

// Delete product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsynError( async (req, res, next) => {

    const product =  await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product is deleted"
    })
})