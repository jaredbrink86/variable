import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction-form/transactions.service';
import { Transaction } from '../transaction-form/transaction.model';
import { CategoriesService } from '../transaction-form/categories.service';
import { Category } from '../transaction-form/category.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[];

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.transactionAdded.subscribe((data) => {
      if (data === 'transaction added')
        this.transactionService.fetchTransactions().subscribe((data) => {
          this.transactions = data;
        });
    });
    this.transactionService.fetchTransactions().subscribe((data) => {
      this.transactions = data;
    });
  }

  getClass(t: HTMLInputElement) {}

  onDelete(id: number) {
    this.transactionService.deleteRecord().subscribe((responseData) => {
      console.log(responseData);
    });
  }
}
