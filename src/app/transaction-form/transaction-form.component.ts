import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { map } from "rxjs/operators";

import { Category } from "./category.model";
import { Transaction } from "./transaction.model";

@Component({
  selector: "app-transaction-form",
  templateUrl: "./transaction-form.component.html",
  styleUrls: ["./transaction-form.component.css"],
})
export class TransactionFormComponent implements OnInit {
  categories: Category[] = [];
  displayForm = false;
  transactionAmount: string;

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

  onNewTransactionClick() {
    this.displayForm = !this.displayForm;
  }

  formatCurrency(event) {
    var uy = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(event.target.value);
    this.transactionAmount = uy.slice(1);
  }

  onSubmit(form: NgForm) {
    const transaction = new Transaction(
      form.value.category,
      form.value.transactionAmount
    );
    this.http
      .post("http://localhost:4000/transactions", transaction)
      .subscribe((responseData) => {
        console.log(responseData);
      });
    form.reset();
  }
}
