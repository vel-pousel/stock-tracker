import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { StockSentiment } from '../model/StockSentiment';
import { StockTrackerService } from './stock-tracker.service';

@Injectable()
export class StockTrackerResolver implements Resolve<StockSentiment[]> {
  constructor(private stockTrackerService: StockTrackerService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StockSentiment[]> {
    let symbol = route.params['symbol'] || route.parent.params['symbol'];
    return this.stockTrackerService.getCompanySentiment(symbol);
  }
}

