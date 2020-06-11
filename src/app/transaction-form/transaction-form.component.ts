import { Component, OnInit } from "@angular/core";
import { Category } from "./category.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Component({
  selector: "app-transaction-form",
  templateUrl: "./transaction-form.component.html",
  styleUrls: ["./transaction-form.component.css"],
})
export class TransactionFormComponent implements OnInit {
  categories: Category[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.http
      .get("http://localhost:4000/categories")
      .pipe(
        map((responseData) => {
          const categoriesArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              categoriesArray.push({ ...responseData[key] });
            }
          }
          return categoriesArray;
        })
      )
      .subscribe((data) => {
        this.categories = data;
      });
  }
}
