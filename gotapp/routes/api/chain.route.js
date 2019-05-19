const express = require('express')
const router = express.Router()
const chainController = require('../../controllers/chain.controller');

router.get('/query', chainController.query);

router.post('/invoke', chainController.invoke);

module.exports = router;