import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

import { AppComponent } from "./app.component";
import { TransactionFormComponent } from "./transaction-form/transaction-form.component";
import { HeaderComponent } from "./header/header.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TransactionFormComponent,
    HeaderComponent,
    TransactionsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
