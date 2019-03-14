import { Component, OnInit, Injectable, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { stringify } from "@angular/core/src/util";
// import { MiningComponent } from "../mining/mining.component"

@Component({
  selector: "ngx-orders",
  templateUrl: "./transactionbook.component.html",
  styleUrls: ["./transactionbook.component.scss"]
})
export class TransactionbookComponent implements OnInit {
  receiver: any = [];
  sender: any = [];
  amount: any = [];

  constructor() {
    console.log(this.sender);
  }
  ngOnChanges() {
  }
  ngOnInit() {}
}
