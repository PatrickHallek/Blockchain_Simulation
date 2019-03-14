import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { stringify } from "@angular/core/src/util";
import {
  NgxPopoverCardComponent,
  NgxPopoverFormComponent,
  NgxPopoverTabsComponent
} from "./blockchain-exsample.component";
import { Blockchain } from "../../../services/models/blockchain.model";
import { Subscription } from "rxjs";
import { DataBaseService } from "../../../services/databse.service";

@Component({
  selector: "ngx-blockchain",
  templateUrl: "./blockchain.component.html",
  styleUrls: ["./blockchain.component.scss"]
})
export class BlockchainComponent implements OnInit {
  cardComponent = NgxPopoverCardComponent;
  tabsComponent = NgxPopoverTabsComponent;
  formComponent = NgxPopoverFormComponent;

  public blockchain: Blockchain[] = [];
  private blockchainSub: Subscription;

  constructor(
    private http: HttpClient,
    private databaseService: DataBaseService
  ) {}

  ngOnInit() {
    this.blockchainSub = this.databaseService
      .getBlockchainListener()
      .subscribe((blockchain: Blockchain[]) => {
        this.blockchain = blockchain;
        this.blockchain
      });
  }
}
