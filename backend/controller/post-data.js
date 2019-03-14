var MongoClient = require("mongodb").MongoClient;
const SHA256 = require("crypto-js/sha256");

var Transaction = require('../models/transaction-schema');
var Blockchain = require('../models/blockchain-schema');


exports.createTransaction = (req, res, next) => {
  new Transaction({
      fromAddress: res.body.fromAddress,
      toAddress: res.body.toAddress,
      amount: res.body.amount
    }).save()
    .then(data => {
      res.status(200).json({
        data: data
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "This email exists already"
      });
    });
}

exports.mineTransaction = (req, res, next) => {
  var blockchainClass = new BlockchainClass();
  blockchainClass.minePendingTransactions().then(data => {
    res.json("Successfully mined")
  });
}

class BlockchainClass {
  constructor() {
    this.chain;
    this.transactions;
    this.pendingTransaction;
    this.difficulty = 2;
    this.miningReward = 1;
    this.miningRewardAddress = "Miner"
  }

  getChain() {
    return new Promise(resolve => {
      Blockchain.find({}).then(chain => {
        resolve(chain);
      })
    });
  }

  getTransaction() {
    return new Promise(resolve => {
      Transaction.find({}).then(pendingTransactions => {
        resolve(pendingTransactions);
      })
    });
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  getLatestTransaction() {
    return [this.transactions[this.transactions.length - 1]];
  }

  async minePendingTransactions() {
    this.chain = await this.getChain()
    this.transactions = await this.getTransaction()
    if (this.isChainValid() == true) {
      if (this.transactions.length != 0) {
        const rewardTx = new Transaction({
          fromAddress: 'Developer wallet',
          toAddress: this.miningRewardAddress,
          amount: this.miningReward
        });
        this.pendingTransactions = this.getLatestTransaction();
        this.pendingTransactions.push(rewardTx);
        if (this.getLatestBlock()) {
          var previousHash = this.getLatestBlock().hash;
        } else {
          previousHash = 0
        }
        let block = new Block(Date.now(), this.pendingTransactions, previousHash);

        block.mineBlock(this.difficulty);
        new Blockchain({
            previousHash: block.previousHash,
            timestamp: block.timestamp,
            transactions: this.pendingTransactions,
            hash: block.hash,
            nonce: block.nonce
          })
          .save().then(() => {
            this.deleteTransaction();
            console.log("BLOCK MINED: " + block.hash);
          });
      } else {
        console.log("no transactions available");
      }
    } else {
      console.log("Blockchain is not valid!")
    }
  }

  deleteTransaction() {
    console.log(this.pendingTransactions[0]._id);
    console.log(this.pendingTransactions[0].fromAddress);
    Transaction.findOneAndRemove({
      _id: this.pendingTransactions[0]._id
    }).then(data => {}).catch(err => {
      console.log(err);
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
}

module.exports.BlockchainClass

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
  }
}
