const router = require('express').Router()
const auth = require('../middleware/auth')
const { addOrderToUserHistory, updateProductQuantity } = require('../middleware/order')
const { createOrder } = require('../controllers/order')

// create order
router.post('/order/create', auth, addOrderToUserHistory, updateProductQuantity, createOrder)

module.exports = router