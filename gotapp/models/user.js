const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

var schema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    secondName: String,
    image: String,
    amount: Number
})

schema.plugin(mongoosePaginate)
const user = mongoose.model('User', schema)

module.exports = user;