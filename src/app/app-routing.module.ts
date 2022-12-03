import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockHomeComponent } from './stocks/components/stock-home/stock-home.component';
import { StockSentimentComponent } from './stocks/components/stock-sentiment/stock-sentiment.component';
import { StockTrackerResolver } from './stocks/service/stock-sentiment.resolve';
import { StockTrackerService } from './stocks/service/stock-tracker.service';


const routes: Routes = [{
  path: '', component: StockHomeComponent,
  data: { title: 'Stock Tracker App' }
},
{
  path: 'sentiment/:symbol',
  component: StockSentimentComponent,
  resolve: { sentiments: StockTrackerResolver },
  data: { title: 'Sentiments' }
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
