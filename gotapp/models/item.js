const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const User = require('./user');

var GotItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    owner: {type: mongoose.Schema.Types.ObjectId,  ref: 'User'},
    price: Number
})

GotItemSchema.plugin(mongoosePaginate)
const item = mongoose.model('Item', GotItemSchema)

module.exports = item;