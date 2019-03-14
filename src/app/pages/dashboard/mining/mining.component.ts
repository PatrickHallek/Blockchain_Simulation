import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataBaseService } from "../../../services/databse.service";
@Component({
  selector: "ngx-mining",
  templateUrl: "./mining.component.html",
  styleUrls: ["./mining.component.scss"]
})
export class MiningComponent implements OnInit {
  difficulty: Number;
  miner: any = [];

  constructor(private http: HttpClient, private databaseService: DataBaseService) {}
  submitMining() {
    this.databaseService.mineTransaction();
  }
  ngOnInit() {}
}
