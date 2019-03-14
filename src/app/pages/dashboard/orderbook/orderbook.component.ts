import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { stringify } from "@angular/core/src/util";

@Component({
  selector: "ngx-orderbook",
  templateUrl: "./orderbook.component.html",
  styleUrls: ["./orderbook.component.scss"]
})
export class OrderbookComponent implements OnInit {
  receiver: any = [];
  sender: any = [];
  amount: any = [];

  constructor() {}
  ngOnChanges() {}
  ngOnInit() {}
}
