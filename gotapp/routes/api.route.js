var express = require('express')

var router = express.Router()
var users = require('./api/user.route');
var chain = require('./api/chain.route');
let items = require('./api/item.route');

router.use('/users', users);
router.use('/chain', chain);
router.use('/items', items);

module.exports = router;