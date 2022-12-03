import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { StockSentiment } from '../../model/StockSentiment';
import { StockTrackerService } from '../../service/stock-tracker.service';
import { DOWN_ARROW, UP_ARROW } from '../stock-home/stock-home.component';

@Component({
  selector: 'app-stock-sentiment',
  templateUrl: './stock-sentiment.component.html',
  styleUrls: ['./stock-sentiment.component.scss']
})
export class StockSentimentComponent implements OnInit {

  private destroySubscriptions$ = new Subject();

  sentiments: StockSentiment[];
  upIcon: string = UP_ARROW;
  downIcon: string = DOWN_ARROW;
  symbol: string;
  companyName: string;

  constructor(activatedRoute: ActivatedRoute, private router: Router, private stackTrackerService: StockTrackerService) {

    activatedRoute.params.pipe(takeUntil(this.destroySubscriptions$)).subscribe(params => {
      this.symbol = params['symbol'];
      this.sentiments = activatedRoute.snapshot.data['sentiments'] || activatedRoute.parent.snapshot.data['sentiments'];
    });
  }

  ngOnInit(): void {
    this.getCompanyName(this.symbol);
  }

  getCompanyName(symbol: string) {
    this.stackTrackerService.getCompanyProfile(symbol)
      .subscribe((response) => {
        if (response) {
          this.companyName = response['name'];
        }
      });

  }
}
