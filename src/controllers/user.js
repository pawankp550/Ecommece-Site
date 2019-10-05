const User = require('../models/user')

exports.getUserByid = async (req, res) => {
    try{
        const user = await User.findById(req.params.id)

        if(!user){
            return res.status(404).send()
        }
        const publicProfile = user.getPublicProfile()
        res.send(publicProfile)
    } catch (e) {
        res.status(500).send()
    }
}

exports.updateUser = async (req, res) => {
    try{
        const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: req.body },
        { new: true })
        console.log(user)
        if(!user){
            return res.status(404).send()
        }
        const publicProfile = user.getPublicProfile()
        res.send(publicProfile)
    } catch (e) {
        res.status(500).send()
    }
}