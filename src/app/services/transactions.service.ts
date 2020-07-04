import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../transaction-form/transaction.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  transactions: Transaction[];
  transactionsChanged = new EventEmitter<Transaction[]>();

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

  // sortTransactions(column) {
  //   return this.transactions.sort((a, b) => (transactions.column > ) ? 1 : -1)
  // }
}
