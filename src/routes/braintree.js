const router = require('express').Router()
const auth = require('../middleware/auth')
const { generateToken } = require('../controllers/braintree')

// get braintree token
router.get('/braintree/getToken', auth, generateToken)

module.exports = router