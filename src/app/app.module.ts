import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { BreakdownChartComponent } from './breakdown-chart/breakdown-chart.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, TransactionFormComponent, TransactionListComponent, BreakdownChartComponent, HeaderComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
