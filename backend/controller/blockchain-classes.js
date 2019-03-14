const SHA256 = require("crypto-js/sha256");

class BlockchainClass {
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

    console.log("BLOCK MINED: " + this.hash);
  }
}

module.exports.Block
