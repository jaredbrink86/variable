import { Component, OnInit, ɵsetCurrentInjector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { map } from "rxjs/operators";

import { Category } from "./category.model";
import { Transaction } from "./transaction.model";
import { TransactionService } from "./transactions.service";
import { CategoriesService } from "./categories.service";

@Component({
  selector: "app-transaction-form",
  templateUrl: "./transaction-form.component.html",
  styleUrls: ["./transaction-form.component.css"],
})
export class TransactionFormComponent implements OnInit {
  categories: Category[] = [];
  displayForm = false;
  transactionAmount: string;
  defaultCategory = "choose";

  constructor(
    private http: HttpClient,
    private transactionService: TransactionService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.categoriesService.fetchCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  getCategories() {
    this.categoriesService.fetchCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onNewTransactionClick() {
    if (!this.displayForm) {
      this.displayForm = !this.displayForm;
    }
  }

  onCategorySelect() {
    console.log("clicked");
  }
  onCancelForm() {
    this.displayForm = !this.displayForm;
  }

  onSubmit(form: NgForm) {
    console.log(form);
    const category = form.value.category;
    const transactionAmount = form.value.transactionAmount;
    const date = form.value.transactionDate;
    const transaction = new Transaction(date, category, transactionAmount);
    this.transactionService.createAndStoreTransactions(transaction);
    form.reset();
    this.displayForm = !this.displayForm;
  }

  private formatCurrency(event) {
    var uy = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(event.target.value);
    if (uy === "$NaN") {
      this.transactionAmount = "";
    } else if (uy === "$0.00") {
      this.transactionAmount === "0.00";
    } else {
      this.transactionAmount = uy.slice(1);
    }
  }
}
