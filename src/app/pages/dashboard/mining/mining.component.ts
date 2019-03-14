import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UpdateService} from "../../../@core/data/update.service";
import { OrderbookService} from "../../../@core/data/orderbook.service";
import { BlockchainService} from "../../../@core/data/blockchain.service";


@Component({
  selector: 'ngx-mining',
  templateUrl: './mining.component.html',
  styleUrls: ['./mining.component.scss']
})
export class MiningComponent implements OnInit {
  difficulty: Number;
  miner: any = [];

  constructor(private http: HttpClient,private updateService: UpdateService,private orderbookService: OrderbookService, private blockchainService: BlockchainService) {
    this.http.get("http://localhost:3000/orderbook").subscribe((data: any) => {
    this.difficulty = data[0].difficulty;
  })
}
  submitMining(){
    this.miner = ['Miner', 'tester'];
    var options = {headers: { 'Content-Type': ['application/json'] }};
    this.http
    .post("http://localhost:3000/mining",this.miner, options)
    .subscribe(() => {}, err => console.error(err));
    setTimeout (() => {
    console.log("block mined!");
    this.updateService.updateOrders();
    this.orderbookService.updateOrders();
    this.blockchainService.updateOrders();
    }, 1000);



}
  ngOnInit() {
  }

}
