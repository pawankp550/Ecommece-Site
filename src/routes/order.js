const router = require('express').Router()
const auth = require('../middleware/auth')
const { createOrder } = require('../controllers/order')

// create order
router.post('/order/create', auth, createOrder)

module.exports = router