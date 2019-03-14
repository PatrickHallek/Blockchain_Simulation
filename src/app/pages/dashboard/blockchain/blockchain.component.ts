import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { stringify } from "@angular/core/src/util";
import {NgxPopoverCardComponent,NgxPopoverFormComponent,NgxPopoverTabsComponent} from "./blockchain-exsample.component";

@Component({
  selector: "ngx-blockchain",
  templateUrl: "./blockchain.component.html",
  styleUrls: ["./blockchain.component.scss"]
})
export class BlockchainComponent implements OnInit {
  previousHash: any = [];
  hash: any = [];
  timestamp: any = [];
  transactions: any = [];
  nonce: any = [];
  xlength: any;
  box: any = [];
  cardComponent = NgxPopoverCardComponent;
  tabsComponent = NgxPopoverTabsComponent;
  formComponent = NgxPopoverFormComponent;

  constructor() {
  }

  ngOnInit() {}
}
