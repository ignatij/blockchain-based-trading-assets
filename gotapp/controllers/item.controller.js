const itemService = require('../services/item.service');
const userService = require('../services/user.service');
const chainService = require('../services/chain.service');

let cachedItems = [];

async function withUsers(items) {
    let result = [];
    for (let chainItem of items) {
        const ownerObj = await userService.findUserById(chainItem.Record.owner);
        let item = {
            id: chainItem.Key,
            name: chainItem.Record.name,
            description: chainItem.Record.description,
            price: chainItem.Record.price,
            image: chainItem.Record.image,
            owner: ownerObj
        }
        result.push(item);
    }
    return result;
}

exports.cacheItems = async function () {
    const chainItems = await chainService.query();
    cachedItems = await withUsers(JSON.parse(chainItems));
    return cachedItems;
};

(async () => {
    await this.cacheItems();
})();

const createChainItem = async (savedItem) => {
    await chainService.createItem(savedItem);
    await this.cacheItems();
};

exports.getItems = async function (req, res, next) {
    try {
        // const username = req.query.username;
        // const user = await userService.findUserByUsername(username);
        // const items = await itemService.getOtherItems(user.id, cachedItems);
        return res.status(200).json({ status: 200, data: cachedItems, message: "Succesfully received items" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message. 
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getMyItems = async function (req, res, next) {
    try {
        const username = req.query.username;
        const user = await userService.findUserByUsername(username);
        const items = await itemService.getMyItems(user.id, cachedItems);
        console.log(items);
        return res.status(200).json({ status: 200, data: items, message: "Succesfully received items" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message. 
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createItem = async function (req, res, next) {
    const item = {
        name: req.body.name,
        description: req.body.description,
        image: req.file.originalname,
        price: req.body.price
    }
    const user = await userService.findUserByUsername(req.body.owner);
    item.owner = user.id;
    try {
        const createdItem = await itemService.createItem(item);
        createChainItem(createdItem);
        return res.status(201).json({ status: 201, data: createdItem, message: "Succesfully Created Item" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: "User Creation was Unsuccesfull" })
    }
}

exports.itemHistory = async (req, res) => {
    const itemId = req.params.itemId;
    let items = await chainService.getHistoryOfItem(itemId);
    let result = [];
    for (let chainItem of JSON.parse(items)) {
        const ownerObj = await userService.findUserById(chainItem.owner);
        let item = {
            name: chainItem.name,
            description: chainItem.description,
            price: chainItem.price,
            image: chainItem.image,
            owner: ownerObj
        }
        result.push(item);
    }
    return res.status(200).json({ status: 200, data: result, message: "Succesfully received history of item" });
};
