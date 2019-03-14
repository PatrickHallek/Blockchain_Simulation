var Transaction = require('../models/transaction-schema');
var Blockchain = require('../models/blockchain-schema');

var Block = require('./blockchain-classes');
var BlockchainClass = require('./blockchain-classes');

exports.getTransactions = (req, res, next) => {
  Transaction.find({}).then(data => {
    res.json(data);
  })
}

exports.getBlockchain = (req, res, next) => {
  Blockchain.find({}).then(data => {
    res.json(data);
  })
}
