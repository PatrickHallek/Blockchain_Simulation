import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { stringify } from "@angular/core/src/util";
import { BlockchainService } from "../../../@core/data/blockchain.service";
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

  constructor(private blockchainService: BlockchainService) {
    this.box = this.blockchainService.box;
    this.hash = this.blockchainService.hash;
    this.timestamp = this.blockchainService.timestamp;
    this.nonce = this.blockchainService.nonce;
    this.transactions = this.blockchainService.transactions;
    this.previousHash = this.blockchainService.previousHash;
    this.xlength = this.blockchainService.xlength;
    console.log(this.xlength);
  }

  ngOnInit() {}
}
