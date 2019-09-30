const router = require('express').Router()
const auth = require('../middleware/auth')
const { isUser, isAdmin, isUserOrAdmin } = require('../middleware/authorization')
const { getUserByid } = require('../controllers/user')

// get user by id
router.get('/users/:id', auth, isUserOrAdmin, getUserByid)
const Router = require('express').Router()
module.exports = router