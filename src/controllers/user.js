const User = require('../models/user')
const { errorHandler } = require("../helpers/dbErrorHandlers"); 

exports.getUserByid = async (req, res) => {
    try{
        const user = await User.findById(req.params.id)

        if(!user){
            return res.status(404).json({
                error: 'coud not find user'
            })
        }
        const publicProfile = user.getPublicProfile()
        res.send(publicProfile)
    } catch (e) {
        res.status(500).json({
            error: errorHandler(e)
        })
    }
}

exports.updateUser = async (req, res) => {
    try{
        const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: req.body },
        { new: true })

        if(!user){
            return res.status(404).json({
                error: 'coud not find user'
            })
        }
        const publicProfile = user.getPublicProfile()
        res.send(publicProfile)
    } catch (e) {
        res.status(500).json({
            error: errorHandler(e)
        })
    }
}