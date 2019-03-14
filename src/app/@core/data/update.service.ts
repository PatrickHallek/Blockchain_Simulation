import { of as observableOf, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UpdateService {
  public receiver: any = [];;
  public sender: any = [];;
  public amount: any = [];;
  public obj;

  constructor(private http: HttpClient) {
    this.updateOrders();
  }

  updateOrders() {

    this.obj = this.http
      .get("http://localhost:3000/transaction")
      .subscribe((data: any) => {
        for (let i = 0; i < data[0].transaction.length; i++) {
          this.receiver[i] = data[0].transaction[i].fromAddress;
          this.sender[i] = data[0].transaction[i].toAddress;
          this.amount[i] = data[0].transaction[i].amount;
        }
        this.receiver[data[0].transaction.length] = [];
        this.sender[data[0].transaction.length] = [];
        this.amount[data[0].transaction.length] = [0];
          });
  }
  getObj() {
    return this.obj;
  }
}

/*receiver: any = [];
  sender: any = [];
  amount: any = [];
  marker: boolean = false;

  constructor(private http: HttpClient) {
    this.updateOrders();
  }

  setMarker(){
    return this.marker = true;
  }

  updateOrders() {
    this.receiver = [""];
    this.sender = [""];
    this.amount = [];
    this.http
      .get("http://localhost:3000/transaction")
      .subscribe((data: any) => {
        for (let i = 0; i < data[0].transaction.length; i++) {
          this.receiver[i] = JSON.stringify(
            data[0].transaction[i].fromAddress
          ).slice(1, -1);
          this.sender[i] = JSON.stringify(
            data[0].transaction[i].toAddress
          ).slice(1, -1);
          this.amount[i] = JSON.stringify(data[0].transaction[i].amount);
        }
      });
  }*/
