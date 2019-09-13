const router = require('express').Router();
const { signup, signin } = require('../controllers/user')


// user sign up route
router.post('/signup', signup)

// user sign in route
router.post('/signin', signin)

router.get('/', (req, res) => {
    res.send('route working')
})


module.exports = router