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

                res.status(200).send(savedOrder)
        } catch (err) {
            res.status(500).json({
            error: errorHandler(err)
        })
    }  
}