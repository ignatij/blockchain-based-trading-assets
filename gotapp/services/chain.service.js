var runScript = require('../run-script');

exports.query = async function query() {
    const result = await runScript('./query.js');
    return result;
}

exports.invoke = async function invoke(itemId, owner){
    await runScript('./invoke.js', {itemId: itemId, owner: owner});
    const result = await runScript('./query.js');
    return result;
}

exports.createItem = async (item) => {
    const result = await runScript('./createItem.js', {
        id: item.id,
        name: item.name,
        description: item.description,
        owner: item.owner,
        price: item.price,
        image: item.image
    });
    return result;
}

exports.getHistoryOfItem = async (itemId) => {
    const result = await runScript('./itemHistory.js', {
        id: itemId
    });
    return result;
}