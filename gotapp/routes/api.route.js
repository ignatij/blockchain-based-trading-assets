const express = require('express')
const users = require('./api/user.route');
const chain = require('./api/chain.route');
const items = require('./api/item.route');

const router = express.Router()

router.use('/users', users);
router.use('/chain', chain);
router.use('/items', items);

module.exports = router;