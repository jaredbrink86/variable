import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import * as c3 from 'c3';
import { TransactionService } from '../services/transactions.service';
import { Transaction } from '../transaction-form/transaction.model';
import { filter } from 'rxjs/operators';
import { initOffset } from 'ngx-bootstrap/chronos/units/offset';

@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrls: ['./transaction-chart.component.css'],
})
export class TransactionChartComponent implements OnInit {
  @ViewChild('chartContent', { static: true }) chartContent;
  transactions: Transaction[];
  chart;
  clickedCategory;
  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.fetchTransactions().subscribe((responseData) => {
      this.transactions = responseData;
      this.generateChart();
    });
    this.transactionService.transactionsChanged.subscribe((data) => {
      this.transactions = data;
      this.generateChart();
    });
  }

  generateChart() {
    this.chart = c3.generate({
      data: {
        columns: [
          ['Groceries', this.getCategoryTotals('Groceries')],
          ['Eating Out', this.getCategoryTotals('Eating Out')],
          ['Gas', this.getCategoryTotals('Gas')],
          ['Entertainment', this.getCategoryTotals('Entertainment')],
          ['Shopping', this.getCategoryTotals('Shopping')],
          ['Travel', this.getCategoryTotals('Travel')],
          ['Personal Care', this.getCategoryTotals('Personal Care')],
        ],
        type: 'donut',
        onclick: (d, i) => {
          console.log(d, i);

          this.clickedCategory = d.id;
        },
        onmouseover: function (d, i) {
          console.log('onmouseover', d, i);
        },
        onmouseout: function (d, i) {
          console.log('onmouseout', d, i);
        },
      },
      donut: {
        title: 'Categories',
      },
    });
  }
  getCategoryTotals(category) {
    const filteredTransactions = this.transactions
      .filter((transaction) => {
        if (transaction.category === category) {
          return transaction;
        }
      })
      .map((transaction) => {
        return +transaction.amount.replace(/[, ]+/g, '').trim();
      });
    if (filteredTransactions.length > 0) {
      const total = filteredTransactions.reduce((totalAmount, current) => {
        return totalAmount + current;
      });
      return total;
    } else {
      return 0;
    }
  }

  onFilterCategory() {
    if (this.clickedCategory) {
      this.transactionService.filterTransactions(
        this.clickedCategory,
        this.transactions
      );
    }
  }
}
