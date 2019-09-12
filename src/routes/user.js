const router = require('express').Router();
const { signup } = require('../controllers/user')


router.post('/signup', signup)

router.get('/', (req, res) => {
    res.send('route working')
})


module.exports = router