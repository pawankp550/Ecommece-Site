const User = require('../models/user')
const { errorHandler } = require('../helpers/dbErrorHandlers')

exports.signup = async (req, res) => {
    const user = new User(req.body)
    try{
        const savedUser = await user.save()
        const publicProfile = savedUser.getPublicProfile()
        res.status(201).send(publicProfile)
    }
    catch (e) {
        res.status(400).send(e)
    }
}

exports.signin = async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body)
        
    } catch (e) {
        res.status(404).send(e)
    }
}