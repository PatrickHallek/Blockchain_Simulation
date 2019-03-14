import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NbMenuService } from "@nebular/theme";
import { Transaction } from "../../../services/models/blockchain.model";
import { DataBaseService } from "../../../services/databse.service";

@Component({
  selector: "ngx-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.scss"]
})
export class TransactionComponent implements OnInit {
  fromAddress: String;
  toAddress: String;
  amount: Number;

  constructor(
    private http: HttpClient,
    private databaseService: DataBaseService
  ) {}

  ngOnInit() {}
  createTransaction() {
    const transaction: Transaction = {
      fromAddress: this.fromAddress,
      toAddress: this.toAddress,
      amount: this.amount
    };
    this.databaseService.createTransaction(transaction);
  }
}
