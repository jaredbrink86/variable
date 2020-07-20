import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../transaction-form/transaction.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  transactions: Transaction[];
  transactionsChanged = new EventEmitter<Transaction[]>();
  editSubmitted = new EventEmitter<boolean>();
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

  updateTransaction(transaction) {
    this.http
      .post(
        `http://localhost:4000/transactions/${transaction.id}/edit`,
        transaction
      )
      .subscribe((data) => {
        this.fetchTransactions().subscribe((data) => {
          this.transactionsChanged.emit(data);
        });
      });
  }

  sortTransactionsAsc(column, transactions, direction) {
    let sortedTransactions;
    if (direction === 'asc') {
      if (column === 'Date') {
        sortedTransactions = transactions.sort(this.compareDatesAsc);
      } else if (column === 'Category') {
        sortedTransactions = transactions.sort(this.compareCategoriesAsc);
      } else {
        sortedTransactions = transactions.sort(this.compareAmountsAsc);
      }
      this.transactionsChanged.emit(sortedTransactions);
    } else if (direction === 'desc') {
      if (column === 'Date') {
        sortedTransactions = transactions.sort(this.compareDatesDesc);
      } else if (column === 'Category') {
        sortedTransactions = transactions.sort(this.compareCategoriesDesc);
      } else {
        sortedTransactions = transactions.sort(this.compareAmountsDesc);
      }
      this.transactionsChanged.emit(sortedTransactions);
    } else if (direction === 'unsorted') {
      sortedTransactions = transactions.sort(this.compareDatesDesc);
    }
  }

  filterTransactions(category, transactions) {
    const filteredTransactions = transactions.filter((transaction) => {
      return transaction.category === category;
    });
    this.transactionsChanged.emit(filteredTransactions);
  }

  cancelEdit() {
    this.editCanceled.emit(false);
  }

  private compareDatesAsc(a, b) {
    const columnA = a.date;
    const columnB = b.date;
    let comparison = 0;
    columnA > columnB ? (comparison = 1) : (comparison = -1);
    return comparison;
  }

  private compareCategoriesAsc(a, b) {
    const columnA = a.category.toUpperCase();
    const columnB = b.category.toUpperCase();
    let comparison = 0;
    columnA > columnB ? (comparison = 1) : (comparison = -1);
    return comparison;
  }

  private compareAmountsAsc(a, b) {
    const columnA = +a.amount.replace(/[, ]+/g, '').trim();
    const columnB = +b.amount.replace(/[, ]+/g, '').trim();
    console.log(columnB, columnA);
    let comparison = 0;
    columnA > columnB ? (comparison = 1) : (comparison = -1);
    return comparison;
  }

  private compareDatesDesc(a, b) {
    const columnA = a.date;
    const columnB = b.date;
    let comparison = 0;
    columnA < columnB ? (comparison = 1) : (comparison = -1);
    return comparison;
  }

  private compareCategoriesDesc(a, b) {
    const columnA = a.category.toUpperCase();
    const columnB = b.category.toUpperCase();
    let comparison = 0;
    columnA < columnB ? (comparison = 1) : (comparison = -1);
    return comparison;
  }

  private compareAmountsDesc(a, b) {
    const columnA = +a.amount.replace(/[, ]+/g, '').trim();
    const columnB = +b.amount.replace(/[, ]+/g, '').trim();
    let comparison = 0;
    columnA < columnB ? (comparison = 1) : (comparison = -1);
    return comparison;
  }
}
