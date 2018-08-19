const chainService = require('../services/chain.service');
const userService = require('../services/user.service');
const itemController = require('./item.controller');

exports.query = async function query(req, res) {
    const result = await chainService.query();
    return res.status(200).json({ status: 200, data: result, message: "Succesfully received transactions" });
}

exports.invoke = async function (req, res) {
    const item = req.body.item;
    const userId = req.body.userId;
    const user = await userService.findUserById(userId);
    let result;
    if (user.amount >= item.price) {
        const originalOwner = await userService.findUserById(item.owner._id);
        user.amount -= item.price;
        originalOwner.amount = Number(originalOwner.amount) + Number(item.price);
        await userService.updateUser(user);
        await userService.updateUser(originalOwner);
        result = await chainService.invoke(item.id, user.id);
        await itemController.cacheItems();
    }
    return res.status(200).json({ status: 200, data: result, message: "Succesfully invoked transaction" });
}
