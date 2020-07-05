import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transactions.service';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css'],
})
export class TransactionEditComponent implements OnInit {
  constructor(private transactionService: TransactionService) {}

  ngOnInit() {}

  onCancelForm() {
    this.transactionService.cancelEdit();
  }
}
