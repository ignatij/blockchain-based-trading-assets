const express = require('express');
const multer = require('multer');
const itemController = require('../../controllers/item.controller');

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage});

router.post('/', upload.single('image'), itemController.createItem);

router.get('/', itemController.getItems);

router.get('/history/:itemId', itemController.itemHistory);


module.exports = router;