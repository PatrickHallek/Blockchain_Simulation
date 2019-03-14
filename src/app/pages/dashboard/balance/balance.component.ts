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
  getAddress() {
    this.balance = 0 ;
    this.http.get("http://localhost:3000/orderbook").subscribe((data: any) => {

    for (let i = 1; i < data[0].chain.length; i++) {
        for (let s = 0; s < data[0].chain[i].transactions.length; s++)
        {
          //console.log(data[0].chain[i].transactions[s].fromAddress+"is?"+this.address);
          if (data[0].chain[i].transactions[s].fromAddress === this.address) {
            this.balance -= data[0].chain[i].transactions[s].amount;
          }
          //console.log(data[0].chain[i].transactions[s].toAddress+"is?"+this.address);
          if (data[0].chain[i].transactions[s].toAddress === this.address) {
            this.balance += data[0].chain[i].transactions[s].amount;
          }
        }
      }
    });
  }
  ngOnInit() {}
}
