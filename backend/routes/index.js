var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
const http = require("http");
const SHA256 = require("crypto-js/sha256");
mongoose.connect("mongodb://localhost/PatrickCoin");
var Schema = mongoose.Schema;
var Schema2 = mongoose.Schema;

var transactionsSchema = new Schema({
  fromAdress: String,
  toAdress: String,
  amount: Number
}, {
  collection: "transactions"
});

var orderbookSchema = new Schema2({
  fromAdress: String,
  toAdress: String,
  amount: Number
}, {
  collection: "blockchain"
});

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

var transactions = mongoose.model("transactions", transactionsSchema);
router.get("/transaction", function (req, res) {
  transactions.find().then(function (doc) {
    res.json(doc);
  });
});

var orderbook = mongoose.model("orderbook", orderbookSchema);
router.get("/orderbook", function (req, res) {
  orderbook.find().then(function (doc) {
    res.json(doc);
  });
});


router.post("/dotransaction", function (req, res) {
  console.log(req.body[0] + req.body[1] + req.body[2]);
  MongoClient.connect(
    "mongodb://localhost:27017/PatrickCoin",
    function (err, db) {
      db.collection("transactions").update({
        _id: ObjectId("5b9fd71a8c33009fb88ede58")
      }, {
        $push: {
          transaction: new Transaction(req.body[0], req.body[1], req.body[2])
        }
      });
    }
  );
});



class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("BLOCK MINED: " + this.hash);
  }
}


class Blockchain {
  constructor() {
    this.chain;
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 1;
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  minePendingTransactions(miningRewardAddress) {
    if (this.isChainValid() == true) {
      if (this.pendingTransactions != undefined) {
        this.deleteTransaction();
        const rewardTx = new Transaction('Developer wallet', miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);
        JSON.stringify(block);
        MongoClient.connect("mongodb://localhost:27017/PatrickCoin", function (err, db) {
          db.collection('blockchain').update({
            _id: ObjectId("5ba0cddc8c33009fb88ee6ac")
          }, {
            "$push": {
              "chain": block
            }
          }, )
        });
        this.pendingTransactions = [];
      } else {
        console.log("no transactions available");
      }
    } else {
      console.log("Blockchain is not valid!")
    }
  }
  deleteTransaction() {
    MongoClient.connect("mongodb://localhost:27017/PatrickCoin", function (err, db) {
      db.collection('transactions').update({}, {
        $unset: {
          "transaction.0": 1
        }
      })
      db.collection('transactions').update({}, {
        $pull: {
          "transaction": null
        }
      })
    });
  }
  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }
  isChainValid() {
    if (this.chain.length > 1) {  
      for (let i = 1; i < this.chain.length; i++) {
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i - 1];
        const calculatedHash = SHA256(previousBlock.previousHash + previousBlock.timestamp + JSON.stringify(previousBlock.transactions) + previousBlock.nonce).toString();
        /*if (currentBlock.hash !== calculatedHash) {
          return false;
        }*/
        if (currentBlock.previousHash !== previousBlock.hash) {
          return false;
        }
      }
    }
    return true;
  }
  setData() {
    MongoClient.connect("mongodb://localhost:27017/PatrickCoin", function (err, db) {
      db.collection('blockchain').find({}).toArray(function (err, result) {
        db.collection('transactions').find({}).toArray(function (err, res) {});
        if (res[0].transaction[0] == undefined) {
          console.log("no transaction to mine");
        } else {
          this.chain = result[0].chain;
          this.pendingTransactions.push(res[0].transaction[0]);
          this.minePendingTransactions(req.body[0]);
        }

      });
    });
  }
}

router.post("/mining", function (req, res) {
  MongoClient.connect("mongodb://localhost:27017/PatrickCoin", function (err, db) {
    db.collection('blockchain').find({}).toArray(function (err, result) {
      db.collection('transactions').find({}).toArray(function (err, res) {
        let patrickCoin = new Blockchain();
        if (res[0].transaction[0] == undefined) {
          console.log("no transaction to mine");
        } else {
          patrickCoin.chain = result[0].chain;
          patrickCoin.pendingTransactions.push(res[0].transaction[0]);
          patrickCoin.minePendingTransactions(req.body[0]);
        }
        db.close();
      });
    });
  });
})
module.exports = router;