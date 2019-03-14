var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Transaction = new Schema({
  fromAddress : String,
  toAddress : String,
  amount : Number
});

module.exports = mongoose.model('transaction', Transaction);
