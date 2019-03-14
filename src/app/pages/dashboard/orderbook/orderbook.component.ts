import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Blockchain } from "../../../services/models/blockchain.model";
import { Subscription } from "rxjs";
import { DataBaseService } from "../../../services/databse.service";

@Component({
  selector: "ngx-orderbook",
  templateUrl: "./orderbook.component.html",
  styleUrls: ["./orderbook.component.scss"]
})
export class OrderbookComponent implements OnInit {
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
      });
  }
}
