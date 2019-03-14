import { of as observableOf, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class BlockchainService {
  public previousHash: any = [];
  public hash: any = [];
  public timestamp: any = [];
  public transactions: any = [];
  public nonce: any = [];
  public xlength: any = [];
  public box: any = [];
  public obj;

  constructor(private http: HttpClient) {
    this.updateOrders();
  }

  updateOrders() {
    this.obj = this.http
      .get("http://localhost:3000/orderbook")
      .subscribe((data: any) => {
        for (let i = data[0].chain.length - 1, s = 0; i >=0; i--) {
          this.hash[s] = data[0].chain[i].hash;
          this.timestamp[s] = JSON.stringify(data[0].chain[i].timestamp);
          this.transactions[s] = JSON.stringify(
            data[0].chain[i].transactions
          ).slice(1, -1);
          this.nonce[s] = JSON.stringify(data[0].chain[i].nonce);
          this.previousHash[s] = JSON.stringify(
            data[0].chain[i].previousHash
          ).slice(1, -1);
          if (s != data[0].chain.length - 1) {
            this.box[s] = i;
          }
          s++;
          this.xlength[i] = [i];
        }

      });

  }
  getObj() {
    return this.obj;
  }
}
