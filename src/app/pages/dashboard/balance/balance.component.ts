import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "ngx-balance",
  templateUrl: "./balance.component.html",
  styleUrls: ["./balance.component.scss"]
})
export class BalanceComponent implements OnInit {
  receiver: any = [];
  sender: any = [];
  amount: any = [];
  balance = 0 ;
  address: String;

  constructor(private http: HttpClient) {

  }
  ngOnInit() {}
}
