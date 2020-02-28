const Product = require('../models/product')

const cloudinary = require("cloudinary")

cloudinary.config({
  cloud_name: "pavank9738",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.create = async (req, res) => {
    try{
        cloudinary.v2.uploader.upload(req.file.path, async function(err, result) {
            if (err) {
                return res.status(500).send(err.message)
            }

            const productObj = {
                ...req.body,
                photo: result.secure_url
            }
        
            const product = new Product(productObj)
                    const savedProduct = await product.save()
                    console.log(savedProduct)
                    if(!savedProduct){
                        return res.status(400).send()
                    }
                    res.status(200).send()
           
        })} catch (e) {
                res.status(500).send(e)
            }
}

exports.getProductById = async (req, res) => {
    console.log(req.params.id)
    try{
        const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(404).send()
        }
        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
}

exports.deleteProductById = async (req, res) => {
    try{
        const product = await Product.findOneAndDelete({_id: req.params.id})

        if(!product){
            return res.status(404).send()
        }
        res.send({
            message: 'item deleted successfully'
        })
    } catch (e) {
        res.status(500).send()
    }
}

exports.updateProductById = async (req, res) => {
    try{
        console.log('Update api incomplete!!!!!!!')
    } catch (e) {}
}

exports.listProducts =  async (req, res) => {
    try{
        const sortType = req.query.sortType ? req.query.sortType : 'desc'
        const sortBy = req.query.sortBy ? req.query.sortBy : 'sold'
        const limit = req.query.limit ? parseInt(req.query.limit) : 10

        const products = await Product.find().populate("category").limit(limit).sort([[sortBy, sortType]]).exec()

        if (!products) {
            return res.status(404).send()
        }

        res.send(products)
    } catch (e) {
        res.status(500).send()
    }
}

exports.listRelatedProducts = async (req, res) => {
    console.log('related products')
    try{
        const sortType = req.query.sortType ? req.query.sortType : 'desc'
        const sortBy = req.query.sortBy ? req.query.sortBy : 'sold'
        const limit = req.query.limit ? parseInt(req.query.limit) : 10

        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(400).send({ error: 'no product with id found' })
        }

        const relatedProducts = await Product.find({ _id: { $ne: req.params.id }, category : product.category })
        if (!relatedProducts) {
            return res.status(400).send({ error: 'no related products found' })
        }

        res.send(relatedProducts)

    } catch (e) {
        res.status(500)
    }
}

exports.listCategories = async (req, res) => {
    console.log('in')
    try {
        const categories = await Product.distinct('category')

        if(!categories) {
            return res.status(404).send({ error: 'no categories found' })
        }

        res.send(categories)
    } catch {
        res.status(500).send()
    }
}


exports.listBySearch = async (req, res) => {
    console.log('listBySearch')
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
    try{
         for (let key in req.body.filters) {
            if (req.body.filters[key].length > 0) {
                if (key === "price") {
                    // gte -  greater than price [0-10]
                    // lte - less than
                    findArgs[key] = {
                        $gte: req.body.filters[key][0],
                        $lte: req.body.filters[key][1]
                    };
                } else {
                    findArgs[key] = req.body.filters[key];
                }
            }
    }
    console.log(findArgs)
    const products = await Product.find(findArgs)
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec()

    if(!products) {
        return res.status(404).send({ error: 'products not found' })
    }

    res.send(products)
    } catch (e) {
        res.status(500).send()
    }

}