import { Component, OnInit, SimpleChanges } from '@angular/core';
import { TransactionService } from '../services/transactions.service';
import { Transaction } from '../transaction-form/transaction.model';
import { CategoriesService } from '../services/categories.service';
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
    this.transactionService.fetchTransactions().subscribe((responseData) => {
      this.transactions = responseData;
    });
    this.transactionService.transactionsChanged.subscribe((data) => {
      this.transactions = data;
    });
  }

  getClass(t: HTMLInputElement) {}

  onDelete(id: number) {
    this.transactionService.deleteTransaction(id.toString());
  }
}
