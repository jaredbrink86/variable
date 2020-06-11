import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "variable";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions() {
    this.http.get("http://localhost:4000").subscribe((data) => {
      console.log(data);
    });
  }
}
