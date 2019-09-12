const User = require('../models/user')

exports.signup = async (req, res) => {
    console.log('insignup')
    const user = new User(req.body)
    console.log(user)
    try{
        const savedUser = await user.save()
        res.status(201).send(savedUser)
    }
    catch (e) {
        res.status(400).send(e)
    }
}