import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Transaction, Blockchain } from "./models/blockchain.model";
import { BlockchainComponent } from "../pages/dashboard/blockchain/blockchain.component";

@Injectable({ providedIn: "root" })
export class DataBaseService {
  private blockchain: Blockchain[];
  private blockchainUpdated = new Subject<Blockchain[]>();
  private transactions: Transaction[];
  private transactionsUpdated = new Subject<Transaction[]>();

  constructor(private http: HttpClient) {
    this.getTransaction();
    this.getBlockchain();
  }

  public getBlockchainListener() {
    return this.blockchainUpdated.asObservable();
  }
  public getTransactionListener() {
    return this.transactionsUpdated.asObservable();
  }

  mineTransaction() {
    this.http
      .get<Blockchain[]>("http://localhost:3000/mineTransaction")
      .subscribe(data => {
        this.getTransaction();
        this.getBlockchain();
      });
  }
  createTransaction(transaction: Transaction) {
    console.log(transaction)
    this.http
      .post<Transaction>("http://localhost:3000/createTransaction", transaction)
      .subscribe(data => {
        this.getTransaction();
        this.getBlockchain();
      });
  }
  getBlockchain() {
    this.http
      .get<Blockchain[]>("http://localhost:3000/blockchain")
      .pipe(
        map(result => {
          return result.map(data => {
            const transactionsUpdate = data.transactions.map(transactions => {
              const transactionsUpdate: Transaction = {
                toAddress: transactions.toAddress,
                fromAddress: transactions.fromAddress,
                amount: transactions.amount
              };
              return transactionsUpdate;
            });
            const blockchain: Blockchain = {
              previousHash: data.previousHash,
              timestamp: data.timestamp,
              transactions: transactionsUpdate,
              hash: data.hash,
              nonce: data.nonce
            };
            return blockchain;
          });
        })
      )
      .subscribe((blockchain: Blockchain[]) => {
        this.blockchain = blockchain;
        this.blockchainUpdated.next(this.blockchain);
      });
  }
  getTransaction() {
    this.http
      .get<Transaction[]>("http://localhost:3000/transactions")
      .pipe(
        map(result => {
          return result.map(data => {
            const transactions: Transaction = {
              fromAddress: data.fromAddress,
              toAddress: data.toAddress,
              amount: data.amount
            };
            return transactions;
          });
        })
      )
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions;
        this.transactionsUpdated.next(this.transactions);
      });
  }
}
