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
    this.displayForm = !this.displayForm;
  }

  onSubmit(form: NgForm) {
    const category = form.value.category;
    const transactionAmount = form.value.transactionAmount;
    const transaction = new Transaction(category, transactionAmount);
    this.transactionService.createAndStoreTransactions(transaction);
    form.reset();
  }

  private formatCurrency(event) {
    var uy = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(event.target.value);
    this.transactionAmount = uy.slice(1);
  }
}
