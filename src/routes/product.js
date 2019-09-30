const Router = require('express').Router()
const { create } = require('../controllers/product')
const path = require('path')

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


Router.post('/product/create', upload.single('imageData'), create)

module.exports = Router