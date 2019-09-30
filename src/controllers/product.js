const Product = require('../models/product')

exports.create = async (req, res) => {
     const productObj = {
         ...req.body,
         photo: req.file.path
     }

     console.log(productObj)
}
