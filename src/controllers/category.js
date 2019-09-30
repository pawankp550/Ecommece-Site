const Category = require('../models/category')

exports.create = async (req, res) => {
    const category = new Category(req.body)

    try{
        const savedCategory = await category.save()
        res.status(201).send(savedCategory)
    } catch (e) {
        res.status(500).send(e)
    }
}