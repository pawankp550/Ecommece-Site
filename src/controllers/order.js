const { Order } = require('../models/order')
const { errorHandler } = require("../helpers/dbErrorHandlers"); 

exports.createOrder = async (req, res) => {
    req.body.order.user = req.user

    try {
            const order = new Order(req.body.order)
                const savedOrder = await order.save()
                if(!savedOrder){
                        return res.status(400).json({
                        error: errorHandler(err)
                    });
                }

                res.status(200).json({savedOrder})
        } catch (err) {
            res.status(500).json({
            error: errorHandler(err)
        })
    }  
}

exports.listAllOrders = async (req, res) => {
    try {
            const orders = await Order.find()
            .populate("user", '_id name email')
            .sort("-created")
            .exec()

            if(!orders) {
                return res.status(404).json({
                    error: errorHandler(err)
                });
            }

            res.json(orders)
            
        } catch (err) {
            res.status(500).json({
            error: errorHandler(err)
        })
    } 
}