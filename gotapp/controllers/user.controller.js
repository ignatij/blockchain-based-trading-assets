const userService = require('../services/user.service')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getUsers = async function (req, res, next) {
    const page = req.query.page ? req.query.page : 1
    const limit = req.query.limit ? req.query.limit : 10;
    try {
        const username = req.query.username;

        const users = username ? await userService.findUserByUsername(username) : await userService.getUsers({}, page, limit);
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Recieved" });

    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });

    }
}

exports.createUser = async function (req, res, next) {
    const user = {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        image: req.file.originalname
    }
    try {
        const createdUser = await userService.createUser(user)
        return res.status(201).json({ status: 201, data: createdUser, message: "Succesfully Created User" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: "User Creation was Unsuccesfull" })
    }
}

exports.updateUser = async function (req, res, next) {
    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "Id must be present" })
    }
    var id = req.body._id;
    var user = {
        id,
        amount: req.body.amount ? req.body.amount : null
    }
    try {
        var updatedUser = await userService.updateUser(user)
        return res.status(200).json({ status: 200, data: updatedUser, message: "Succesfully Updated User" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}

exports.removeUser = async function (req, res, next) {
    var id = req.params.id;
    try {
        var deleted = await userService.deleteUser(id)
        return res.status(204).json({ status: 204, message: "Succesfully User Deleted" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}

exports.login = async function (req, res, next) {
    let user = await userService.findUserByUsername(req.body.username);
    if (user) {
        if (isValid(req.body.password, user.password)) {
            let token = jwt.sign({ username: user.username }, 'secret', { expiresIn: '3h' });
            return res.status(200).json(token);
        } else {
            return res.status(501).json({ message: 'Invalid credentials' });
        }
    } else {
        res.status(501).json({ message: '' })
    }
}

const isValid = (hashedPassword, userPassword) => bcrypt.compareSync(hashedPassword, userPassword);
