const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user.controller');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });

router.get('/', UserController.getUsers)

router.post('/', upload.single('image'), UserController.createUser)

router.post('/login', UserController.login)

router.put('/', UserController.updateUser)

router.delete('/:id', UserController.removeUser)


// Export the Router

module.exports = router;