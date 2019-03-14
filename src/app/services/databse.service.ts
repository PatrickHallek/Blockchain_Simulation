import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class DataBaseService {
  constructor(private http: HttpClient) {}
}
