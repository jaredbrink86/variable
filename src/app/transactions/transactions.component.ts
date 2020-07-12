import { Component, OnInit, SimpleChanges } from '@angular/core';
import { TransactionService } from '../services/transactions.service';
import { Transaction } from '../transaction-form/transaction.model';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../transaction-form/category.model';
import {
  faSort,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[];
  total: string;
  faSort = faSort;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  sortDirections = ['unsorted', 'asc', 'desc'];
  sortedColumn = 'Date';
  sortDirectionIndex = 0;
  editMode = false;
  editingRow: 29;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.fetchTransactions().subscribe((responseData) => {
      this.transactions = responseData;
      this.getTotal();
    });
    this.transactionService.transactionsChanged.subscribe((data) => {
      this.transactions = data;
      this.getTotal();
    });
    this.transactionService.editCanceled.subscribe((data) => {
      this.editMode = data;
    });
    this.transactionService.editSubmitted.subscribe((data) => {
      this.editMode = data;
    });
  }

  getClass(t: HTMLInputElement) {}

  onDelete(id: number) {
    this.transactionService.deleteTransaction(id.toString());
  }

  onColumnSort(column: string) {
    if (this.sortDirectionIndex === 2 && this.sortedColumn === column) {
      this.sortDirectionIndex = 0;
    } else if (this.sortedColumn !== column) {
      this.sortDirectionIndex = 1;
    } else {
      this.sortDirectionIndex++;
    }
    this.sortedColumn = column;
    this.transactionService.sortTransactionsAsc(
      column,
      this.transactions,
      this.sortDirections[this.sortDirectionIndex]
    );
  }

  getTotal() {
    if (this.transactions.length) {
      const total = this.transactions
        .map((transaction) => {
          let amount = +transaction.amount.replace(/[, ]+/g, '').trim();
          return amount;
        })
        .reduce((prev, current) => {
          return prev + current;
        });
      this.total = total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      console.log(this.total);
    } else {
      this.total = '0';
    }
  }

  onEdit(transaction) {
    this.editMode = true;
    this.editingRow = transaction.id;
    // this.transactionService.startEdit(transaction);
  }
}
