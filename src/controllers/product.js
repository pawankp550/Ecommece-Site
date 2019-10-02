const Product = require('../models/product')

exports.create = async (req, res) => {
     const productObj = {
         ...req.body,
         photo: req.file.path
     }

         const product = new Product(productObj)
     try{
         const savedProduct = await product.save()
         console.log(savedProduct)
         if(!savedProduct){
            return res.status(400).send()
         }
         res.status(200).send()
     } catch (e) {
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
        const product = await Product.findByIdAndRemove(req.params.id)

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