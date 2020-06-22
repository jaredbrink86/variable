import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from './transaction.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  transactionChanged = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  createAndStoreTransactions(transaction: Transaction) {
    return this.http.post('http://localhost:4000/transactions', transaction);
  }

  fetchTransactions() {
    return this.http
      .get<{ [key: string]: Transaction }>('http://localhost:4000/transactions')
      .pipe(
        map((responseData) => {
          const transactionsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              transactionsArray.push({ ...responseData[key] });
            }
          }
          console.log(transactionsArray);
          return transactionsArray;
        })
      );
  }

  deleteTransaction(id: string) {
    return this.http.post(`http://localhost:4000/transactions/${id}`, { id });
  }
}
