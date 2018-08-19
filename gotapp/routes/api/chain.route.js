var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var ChainController = require('../../controllers/chain.controller');

router.get('/query', ChainController.query);

router.post('/invoke', ChainController.invoke);

module.exports = router;