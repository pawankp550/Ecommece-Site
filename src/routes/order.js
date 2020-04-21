const router = require('express').Router()
const auth = require('../middleware/auth')
const { isAdmin } = require('../middleware/authorization')

const { addOrderToUserHistory, updateProductQuantity } = require('../middleware/order')
const { createOrder, listAllOrders } = require('../controllers/order')

// create order
router.post('/order/create', auth, addOrderToUserHistory, updateProductQuantity, createOrder)

// list orders
router.get('/order/list', auth, isAdmin, listAllOrders )

module.exports = router