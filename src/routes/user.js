const router = require('express').Router()
const auth = require('../middleware/auth')
const { getUserByid } = require('../controllers/user')

// get user by id
router.get('/users/:id',auth, getUserByid)

module.exports = router