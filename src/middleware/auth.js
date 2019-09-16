const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorisation')
        const decodedToken = await jwt.verify(token, process.env.TokenText)
        const user = await User.findOne({ _id: decodedToken._id })
        if (!user) {
            throw new Error
        }

        res.user = user
        res.token = token
        next()
    } catch (e) {
        res.status(501).send(e+' please authenticate')
    }
}

module.exports = auth