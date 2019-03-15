import { Component, OnInit } from "@angular/core";
import { DataBaseService } from "../../../services/databse.service";
import { Subscription } from "rxjs";

@Component({
  selector: "ngx-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.scss"]
})
export class SpinnerComponent implements OnInit {
  constructor(private databaseService: DataBaseService) {}
  public spinner: boolean = false;
  private spinnerSub: Subscription;

  ngOnInit() {
    this.spinnerSub = this.databaseService
      .getSpinnerListener()
      .subscribe(spinner => {
        this.spinner = spinner;
      });
  }
}
