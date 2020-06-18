import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Transaction } from "./transaction.model";

@Injectable({ providedIn: "root" })
export class TransactionService {
  constructor(private http: HttpClient) {}

  createAndStoreTransactions(transaction: Transaction) {
    this.http
      .post("http://localhost:4000/transactions", transaction)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
}
