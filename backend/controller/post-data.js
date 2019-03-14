var MongoClient = require("mongodb").MongoClient;
const SHA256 = require("crypto-js/sha256");

var Transaction = require('../models/transaction-schema');
var Blockchain = require('../models/blockchain-schema');


exports.createTransaction = (req, res, next) => {
  console.log(req.body);
  new Transaction({
      fromAddress: req.body.fromAddress,
      toAddress: req.body.toAddress,
      amount: req.body.amount
    }).save()
    .then(data => {
      res.status(200).json({
        data: data
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
}

