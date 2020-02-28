const Router = require('express').Router()
const { create, getProductById, deleteProductById, updateProductById, listProducts, listRelatedProducts, listCategories, listBySearch } = require('../controllers/product')
const auth = require('../middleware/auth')
const { isAdmin } = require('../middleware/authorization')
const upload = require('../middleware/multer')

// create product
Router.post('/product/create', auth, isAdmin, upload.single('imageData'), create, (error, req, res, next) => {
 res.status(400).send({ error: error.message })
})


// list categories
Router.get('/product/categories', listCategories)

// get product
Router.get('/product/:id', getProductById)

// remove product
Router.delete('/product/:id', auth, isAdmin, deleteProductById)

// update product
Router.patch('/product/:id',  upload.single('imageData'), updateProductById)

// get products
Router.get('/product', listProducts)

// get relatedItems
Router.get('/product/related/:id', listRelatedProducts)

// get bySearch
Router.post("/products/by/search", listBySearch)


module.exports = Router