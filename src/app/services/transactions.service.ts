import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../transaction-form/transaction.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  transactions: Transaction[];
  transactionsChanged = new EventEmitter<Transaction[]>();
  editCanceled = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  createAndStoreTransactions(transaction: Transaction) {
    this.http
      .post('http://localhost:4000/transactions', transaction)
      .subscribe((data) => {
        this.fetchTransactions().subscribe((data) => {
          this.transactionsChanged.emit(data);
        });
      });
  }

  fetchTransactions() {
    return this.http.get('http://localhost:4000/transactions').pipe(
      map((responseData) => {
        const transactionsArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            transactionsArray.push({
              id: responseData[key].id,
              date: responseData[key].transaction_date,
              category: responseData[key].category,
              amount: responseData[key].transaction_amount,
            });
          }
        }
        return transactionsArray;
      })
    );
  }

  deleteTransaction(id: string) {
    this.http
      .post(`http://localhost:4000/transactions/${id}`, { id })
      .subscribe((data) => {
        this.fetchTransactions().subscribe((data) => {
          this.transactionsChanged.emit(data);
        });
      });
  }

  sortTransactions(column, transactions) {
    let sortedTransactions;
    if (column === 'Date') {
      sortedTransactions = transactions.sort(this.compareDates);
    } else if (column === 'Category') {
      sortedTransactions = transactions.sort(this.compareCategories);
    } else {
      sortedTransactions = transactions.sort(this.compareAmounts);
    }
    this.transactionsChanged.emit(sortedTransactions);
  }

  cancelEdit() {
    this.editCanceled.emit(false);
  }

  private compareDates(a, b) {
    const columnA = a.date.toUpperCase();
    const columnB = b.date.toUpperCase();
    let comparison = 0;
    columnA > columnB ? (comparison = 1) : (comparison = -1);
    return comparison;
  }

  private compareCategories(a, b) {
    const columnA = a.category.toUpperCase();
    const columnB = b.category.toUpperCase();
    let comparison = 0;
    columnA > columnB ? (comparison = 1) : (comparison = -1);
    return comparison;
  }

  private compareAmounts(a, b) {
    const columnA = a.amount.toUpperCase();
    const columnB = b.amount.toUpperCase();
    let comparison = 0;
    columnA > columnB ? (comparison = 1) : (comparison = -1);
    return comparison;
  }
}
