import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { TransactionService } from '../services/transactions.service';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../transaction-form/category.model';
import { Transaction } from '../transaction-form/transaction.model';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css'],
})
export class TransactionEditComponent implements OnInit {
  @Input() editedTransaction: Transaction;
  date: Date;
  categories: Category[] = [];
  displayForm = false;
  transactionAmount: string;
  selectedCategory;

  constructor(
    private http: HttpClient,
    private transactionService: TransactionService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.categoriesService.fetchCategories().subscribe((categories) => {
      this.categories = categories;
    });
    this.setTransactionProperties();
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

  onSubmit(form: NgForm) {
    const category = form.value.category;
    const transactionAmount = form.value.transactionAmount;
    const date = form.value.transactionDate;
    const transaction = new Transaction(date, category, transactionAmount);
    form.reset();
    this.displayForm = !this.displayForm;
    this.transactionService.createAndStoreTransactions(transaction);
  }

  onCancelForm() {
    this.transactionService.cancelEdit();
  }

  setTransactionProperties() {
    const transactionDate = this.editedTransaction.date;
    this.date = new Date(transactionDate.toString());
    this.transactionAmount = this.editedTransaction.amount;
    this.selectedCategory = this.editedTransaction.category;
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
