import { Component, OnInit, Injectable, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { stringify } from "@angular/core/src/util";
import { Transaction } from "../../../services/models/blockchain.model";
import { Subscription } from "rxjs";
import { DataBaseService } from "../../../services/databse.service";
// import { MiningComponent } from "../mining/mining.component"

@Component({
  selector: "ngx-orders",
  templateUrl: "./transactionbook.component.html",
  styleUrls: ["./transactionbook.component.scss"]
})
export class TransactionbookComponent implements OnInit {
  public transaction: Transaction[] = [];
  private transactionSub: Subscription;

  constructor(
    private http: HttpClient,
    private databaseService: DataBaseService
  ) {}

  ngOnInit() {
    this.transactionSub = this.databaseService
      .getTransactionListener()
      .subscribe((transaction: Transaction[]) => {
        this.transaction = transaction;
      });
  }
}
