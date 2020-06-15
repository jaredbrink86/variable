import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { TransactionFormComponent } from "./transaction-form/transaction-form.component";
import { HeaderComponent } from "./header/header.component";
import { TransactionsComponent } from "./transactions/transactions.component";

@NgModule({
  declarations: [
    AppComponent,
    TransactionFormComponent,
    HeaderComponent,
    TransactionsComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
