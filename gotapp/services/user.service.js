const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getUsers = async function (query, page, limit) {
    const options = {
        page,
        limit
    }
    try {
        const users = await User.paginate(query, options)
        return users;

    } catch (e) {
        console.log(e);
        throw Error('Error while Paginating Users')
    }
}

exports.createUser = async function (user) {
    const newUser = new User({
        username: user.username,
        password: hashPassword(user.password),
        firstName: user.firstName,
        secondName: user.secondName,
        image: user.image,
        amount: 100
    });
    try {
        const savedUser = await newUser.save()
        return savedUser;
    } catch (e) {
        throw Error("Error while Creating User")
    }
}

exports.updateUser = async function (user) {
    var id = user.id
    try {
        var oldUser = await User.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    if (!oldUser) {
        return false;
    }
    oldUser.amount = user.amount;

    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

exports.deleteUser = async function (userId) {
    try {
        var deleted = await User.remove({_id: userId});
        if (deleted.result.n === 0) {
            throw Error("User Could not be deleted")
        }
        return deleted
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}

exports.findUserByUsername = async function (userName) {
    return User.findOne({username: userName});
}

exports.findUserById = async function (id) {
    return User.findOne({_id: id});
}

const hashPassword = (password) => bcrypt.hashSync(password, 10);
