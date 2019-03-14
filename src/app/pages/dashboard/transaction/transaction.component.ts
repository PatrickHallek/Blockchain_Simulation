import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NbMenuService } from "@nebular/theme";
import { UpdateService} from "../../../@core/data/update.service";
import { OrderbookService} from "../../../@core/data/orderbook.service";
import { BlockchainService} from "../../../@core/data/blockchain.service";

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

  constructor(private http: HttpClient,private updateService: UpdateService,private orderbookService: OrderbookService, private blockchainService: BlockchainService) {}

  postValues() {
    if (this.amount && this.fromAddress && this.toAddress !== null) {
      this.value.push(this.toAddress);
      this.value.push(this.fromAddress);
      this.value.push(this.amount);
      var options = { headers: { "Content-Type": ["application/json"] } };
      this.http
        .post("http://localhost:3000/dotransaction", this.value, options)
        .subscribe(() => {}, err => console.error(err));
      console.log("Passed values:" + this.value);
      this.toAddress = null;
      this.fromAddress = null;
      this.amount = null;
      setTimeout (() => {
        console.log("Order accepted");
        this.updateService.updateOrders();
        this.orderbookService.updateOrders();
        this.blockchainService.updateOrders();
        }, 500);
    }
  }
  ngOnInit() {}
}
