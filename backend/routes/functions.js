const SHA256 = require("crypto-js/sha256");
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");


MongoClient.connect('mongodb://localhost:27017/PatrickCoin', function(err, db) {   
    if(err) throw err;
    db.collection('blockchain').find({}).toArray(function(err, result) {
        if(err) throw err;        
        db.collection('transactions').find({}).toArray(function(err, data) {
            
            class Transaction{
            constructor(fromAddress, toAddress, amount){
                this.fromAddress = fromAddress;
                this.toAddress = toAddress;
                this.amount = amount;    
                }
            }
        
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

            class Blockchain{
                constructor() {
                    this.chain = this.parseResult(result).chain;
                    this.difficulty = 2;
                    this.pendingTransactions = [];
                    this.miningReward = 1;
                }
                parseResult(parse){
                    var res = JSON.stringify(parse);
                    res = res.slice(1,-1);
                    res = JSON.parse(res);       
                    return res;
                }
                createGenesisBlock() {
                    return new Block(Date.parse("2017-01-01"), [], "0");
                }

                getLatestBlock() {
                    return this.chain[this.chain.length - 1];
                }

                minePendingTransactions(miningRewardAddress){
                    if(this.parseResult(data).transaction[0] != null){
                    this.pendingTransactions.push(this.parseResult(data).transaction[0]);
                    this.deleteTransaction();
                    const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
                    this.pendingTransactions.push(rewardTx);
                    
                    let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
                    block.mineBlock(this.difficulty);

                    console.log('Block successfully mined!');
                    this.chain.push(block);
                    JSON.stringify(block);
                    db.collection('blockchain').update(
                        { _id: ObjectId("5ba0cddc8c33009fb88ee6ac")},
                        { "$push": { "chain": block} },
                    )
                    this.pendingTransactions = [];
                }else{
                    console.log("No transactions");
                }
                }

                createTransaction(transaction){

                    //this.pendingTransactions.push(transaction);
                    db.collection('transactions').update(
                        { _id: ObjectId("5b9fd71a8c33009fb88ede58")},
                        { "$push": { "transaction": transaction} },
                    )
                }
                deleteTransaction(){
                    db.collection('transactions').update({}, {$unset : {"transaction.0" : 1 }}) 
                    db.collection('transactions').update({}, {$pull : {"transaction" : null}})
                }
                getBalanceOfAddress(address){
                    let balance = 0;
                    for(const block of this.chain){
                        for(const trans of block.transactions){
                            if(trans.fromAddress === address){
                                balance -= trans.amount;
                            }

                            if(trans.toAddress === address){
                                balance += trans.amount;
                            }
                        }
                    }

                    return balance;
                }

                isChainValid() {
                    for (let i = 1; i < this.chain.length; i++){
                        const currentBlock = this.chain[i];             
                        const previousBlock = this.chain[i - 1];
                        /*if (currentBlock.hash !== currentBlock.calculateHash()) {
                            return false;
                        }
                        */
                        if (currentBlock.previousHash !== previousBlock.hash) {
                            return false;
                        }
                    }
                    return true;
                }
            }


            let patrickCoin = new Blockchain();
            router.get("/dotransaction", function(req, res) {
                patrickCoin.createTransaction(new Transaction('Susanne','Robert', 60));
                });
            /*
            console.log('\n');
            console.log('Blockchain valid? ' + patrickCoin.isChainValid());
            console.log('======================');
            console.log('|| New transaction ||');
            console.log('======================');
            patrickCoin.createTransaction(new Transaction('Peter','Jenny', 15));
           // patrickCoin.createTransaction(new Transaction('Susanne','Robert', 60));   
           // patrickCoin.createTransaction(new Transaction('Lutz','Steffen', 55));         
           // patrickCoin.createTransaction(new Transaction('Detlef','Marco', 45));

        
            console.log('Starting the miner...');
            patrickCoin.minePendingTransactions('Patrick-miner');

            console.log('\nBalance of Patrick-Miner is', patrickCoin.getBalanceOfAddress('Patrick-miner'));
            console.log('\nBalance of Sender is', patrickCoin.getBalanceOfAddress('Sender'));
            console.log('\nBalance of Reciver is', patrickCoin.getBalanceOfAddress('Reciver'));       
            console.log('\n');
            */
        });
    });
});
module.exports = router;
