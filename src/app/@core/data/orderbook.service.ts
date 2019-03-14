import { of as observableOf, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class OrderbookService {
  public receiver: any = [];
  public sender: any = [];
  public amount: any = [];
  public obj;

  constructor(private http: HttpClient) {
    this.updateOrders();
  }
  updateOrders() {
    this.obj = this.http
      .get("http://localhost:3000/transactions")
      .subscribe((data: any) => {
        for (let i = data[0].chain.length - 2, s = 0; i >= 0; i--) {
          s++;
          this.receiver[s] = JSON.stringify(
            data[0].chain[i + 1].transactions[0].fromAddress
          ).slice(1, -1);
          this.sender[s] = JSON.stringify(
            data[0].chain[i + 1].transactions[0].toAddress
          ).slice(1, -1);
          this.amount[s] = JSON.stringify(
            data[0].chain[i + 1].transactions[0].amount
          );/*
          this.receiver[data[0].transaction.length] = [];
          this.sender[data[0].transaction.length] = [];
          this.amount[data[0].transaction.length] = [];*/
        }
      });
  }
  getObj() {
    return this.obj;
  }
}
