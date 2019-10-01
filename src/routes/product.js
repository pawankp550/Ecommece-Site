const Router = require('express').Router()
const { create, getById } = require('../controllers/product')
const path = require('path')
const auth = require('../middleware/auth')
const { isAdmin } = require('../middleware/authorization')

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/ImageUploads/'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

// create product
Router.post('/product/create', auth, isAdmin,upload.single('imageData'), create)

// get product
Router.get('product/get/:id', getById)
module.exports = Router