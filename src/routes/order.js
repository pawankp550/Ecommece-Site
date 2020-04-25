const router = require('express').Router()
const auth = require('../middleware/auth')
const { isAdmin } = require('../middleware/authorization')

const { addOrderToUserHistory, updateProductQuantity } = require('../middleware/order')
const { createOrder, listAllOrders, listOrderStatuses } = require('../controllers/order')

// create order
router.post('/order/create', auth, addOrderToUserHistory, updateProductQuantity, createOrder)

// list orders
router.get('/order/list', auth, isAdmin, listAllOrders )

// get status enums
router.get('/order/status', auth, isAdmin, listOrderStatuses)

module.exports = router