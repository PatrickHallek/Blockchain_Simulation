import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "ngx-mining",
  templateUrl: "./mining.component.html",
  styleUrls: ["./mining.component.scss"]
})
export class MiningComponent implements OnInit {
  difficulty: Number;
  miner: any = [];

  constructor(
    private http: HttpClient,
  ) {
    this.http.get("http://localhost:3000/orderbook").subscribe((data: any) => {
      this.difficulty = data[0].difficulty;
    });
  }
  submitMining() {
  }
  ngOnInit() {}
}
