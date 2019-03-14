import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NbMenuService } from "@nebular/theme";

@Component({
  selector: "ngx-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.scss"]
})
export class TransactionComponent implements OnInit {
  fromAddress: String;
  toAddress: String;
  amount: Number;
  value: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}
}
