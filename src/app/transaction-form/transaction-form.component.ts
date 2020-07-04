import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { Category } from './category.model';
import { Transaction } from './transaction.model';
import { TransactionService } from '../services/transactions.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
})
export class TransactionFormComponent implements OnInit {
  categories: Category[] = [];
  displayForm = false;
  transactionAmount: string;
  selectedCategory = 'choose';
  date;

  constructor(
    private http: HttpClient,
    private transactionService: TransactionService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  getCategories() {
    this.categoriesService.fetchCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  initializeForm() {
    this.categoriesService.fetchCategories().subscribe((categories) => {
      this.categories = categories;
    });
    this.date = new Date();
  }
  onNewTransactionClick() {
    if (!this.displayForm) {
      this.displayForm = !this.displayForm;
      this.initializeForm();
    }
  }

  onCancelForm() {
    this.displayForm = !this.displayForm;
  }

  onSubmit(form: NgForm) {
    const category = form.value.category;
    const transactionAmount = form.value.transactionAmount;
    const date = form.value.transactionDate;
    const transaction = new Transaction(date, category, transactionAmount);
    form.reset();
    this.displayForm = !this.displayForm;
    this.transactionService.createAndStoreTransactions(transaction);
  }

  private isAmountValid() {
    if (this.transactionAmount === '' || this.transactionAmount === '0.00') {
      return false;
    } else {
      return true;
    }
  }

  private isCategoryValid() {
    return this.selectedCategory !== 'choose';
  }
  private formatCurrency(event) {
    const amount = parseFloat(event.target.value.replace(/,/g, ''));
    var uy = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(amount);
    if (uy === '$NaN') {
      this.transactionAmount = '';
    } else if (+uy === 0) {
      this.transactionAmount === '0.00';
    } else if (uy[uy.length - 3] !== '.') {
      uy += '.00';
      this.transactionAmount = uy.slice(1);
    } else {
      this.transactionAmount = uy.slice(1);
    }
  }
}
