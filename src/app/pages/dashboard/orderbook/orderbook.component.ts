import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { stringify } from "@angular/core/src/util";
import { OrderbookService } from "../../../@core/data/orderbook.service";

@Component({
  selector: "ngx-orderbook",
  templateUrl: "./orderbook.component.html",
  styleUrls: ["./orderbook.component.scss"]
})
export class OrderbookComponent implements OnInit {
  receiver: any = [];
  sender: any = [];
  amount: any = [];

  constructor(private updateService: OrderbookService) {
    this.receiver = this.updateService.receiver;
    this.sender = this.updateService.sender;
    this.amount = this.updateService.amount;

  }
  ngOnChanges() {
  }
  ngOnInit() {}
}
