var express = require("express");
var router = express.Router();


var GetController = require("../controller/get-data");
var PostController = require("../controller/post-data");

router.get('/transactions', GetController.getTransactions);
router.get('/blockchain', GetController.getBlockchain);
router.get('/mineTransaction', GetController.mineTransaction);

router.post('/createTransaction', PostController.createTransaction);

module.exports = router;
