import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Blockchain } from "../../../services/models/blockchain.model";
import { Subscription } from "rxjs";
import { DataBaseService } from "../../../services/databse.service";

@Component({
  selector: "ngx-balance",
  templateUrl: "./balance.component.html",
  styleUrls: ["./balance.component.scss"]
})
export class BalanceComponent implements OnInit {
  public address: String;
  public balance: number;
  public blockchain: Blockchain[] = [];
  private blockchainSub: Subscription;

  constructor(
    private http: HttpClient,
    private databaseService: DataBaseService
  ) {}
  ngOnInit() {}
  getBalance() {
    this.balance = this.databaseService.getBalance(this.address);
  }
}
