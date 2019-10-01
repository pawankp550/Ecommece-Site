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


exports.getById = async (req, res) => {

}