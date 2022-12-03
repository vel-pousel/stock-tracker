import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StockInfo } from '../model/StockInfo';
import { StockSentiment } from '../model/StockSentiment';

@Injectable({
  providedIn: 'root'
})
export class StockTrackerService {

  constructor(private http: HttpClient) { }

  configUrl = "https://finnhub.io/api/v1/";
  token = "&token=bu4f8kn48v6uehqi3cqg";

  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


  //Search Company
  searchCompany(search: string) {
    return this.http.get(this.configUrl + "search?q=" + search + this.token);
  }

  // Company profile
  getCompanyProfile(symbol: string) {
    return this.http.get(
      this.configUrl + "stock/profile2?symbol=" + symbol + this.token
    );
  }
  /**
   * get company last three month sentiment details
   */
  getCompanySentiment(symbol: string): Observable<StockSentiment[]> {
    let curDate = new Date();
    let curMonthDate = curDate.getFullYear() + "-" + (curDate.getMonth()) + "-01";
    let toMonthDate = curDate.getFullYear() + "-" + (curDate.getMonth() - 2) + "-01";
    return this.http.get(
      this.configUrl + "stock/insider-sentiment?symbol=" + symbol + "&from=" + toMonthDate + "&to=" + curMonthDate + this.token
    ).pipe(map(response => (this.buildSentiments(response['data']))));
  }

  buildSentiments(responseList): StockSentiment[] {
    let data: StockSentiment[] = []

    data = responseList.slice(-3).map(response => {
      return {
        symbol: response['symbol'],
        year: response['year'],
        month: response['month'],
        change: response['change'],
        mspr: response['mspr'],
        monthName: this.months[response['month']]
      };
    });

    return data;
  }
  // Company quote
  getStockQuote(symbol: string): Observable<StockInfo> {
    return this.http.get(
      this.configUrl + "quote?symbol=" + symbol + this.token
    ).pipe(map(body => ({
      currentPrice: body['c'],
      changePrice: body['d'],
      percentChange: body['dp'],
      highPriceOfDay: body['h'],
      lowPriceOfDay: body['l'],
      openPriceOfDay: body['o'],
      prevClosePrice: body['pc'],
      trending: body['t'],
      symbol: symbol
    })));
  }

}
