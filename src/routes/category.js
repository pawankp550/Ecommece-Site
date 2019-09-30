const Router = require('express').Router()
const { create } = require('../controllers/category')
const { isAdmin } = require('../middleware/authorization')
const auth = require('../middleware/auth')

Router.post('/category/create', auth, isAdmin, create)

module.exports = Router