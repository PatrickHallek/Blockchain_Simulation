var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Blockchain = new Schema({
  previousHash: String,
  timestamp: String,
  transactions: Object,
  hash: String,
  nonce: Number
});

module.exports = mongoose.model('blockchain', Blockchain);
