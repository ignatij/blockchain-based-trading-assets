const Item = require('../models/item');
const UserService = require('./user.service');

exports.getMyItems = async function (userId, cachedItems) {
    try {
        // let items = await Item.paginate(query, options);
        let myItems = [];
        for (let item of cachedItems.slice()) {
            if (item.owner === userId) {
                const owner = await UserService.findUserById(item.owner);
                item.owner = owner;
                myItems.push(item);
            }
        }
        return myItems;
    } catch (e) {
        console.log(e);
        throw Error('Error while Paginating Items')
    }
}

exports.getOtherItems = async function (userId, cachedItems) {
    try {
        let otherItems = [];
        for (let item of cachedItems.slice()) {
            if (item.owner != userId) {
                const owner = await UserService.findUserById(item.owner);
                item.owner = owner;
                otherItems.push(item);
            }
        }
        return otherItems;
    } catch (e) {
        console.log(e);
        throw Error('Error while Paginating Items')
    }
}

exports.createItem = async function (item) {
    const newItem = new Item({
        name: item.name,
        description: item.description,
        image: item.image,
        price: item.price,
        owner: item.owner
    });
    try {
        const savedItem = await newItem.save();
        return savedItem;
    } catch (e) {
        throw Error("Error while Creating Item")
    }
}