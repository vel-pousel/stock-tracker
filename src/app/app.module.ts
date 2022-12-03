import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { StockTrackerComponent } from './stocks/components/stock-tracker/stock-tracker.component';
import { StockDetailsComponent } from './stocks/components/stock-details/stock-details.component';
import { StockHomeComponent } from './stocks/components/stock-home/stock-home.component';
import { StockSentimentComponent } from './stocks/components/stock-sentiment/stock-sentiment.component';
import { StockTrackerService } from './stocks/service/stock-tracker.service';
import { StockTrackerResolver } from './stocks/service/stock-sentiment.resolve';

@NgModule({
  declarations: [
    AppComponent,
    StockHomeComponent,
    StockTrackerComponent,
    StockDetailsComponent,
    StockHomeComponent,
    StockSentimentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [StockTrackerService, StockTrackerResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
