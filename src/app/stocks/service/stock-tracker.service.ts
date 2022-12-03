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

  configUrl: string = "https://finnhub.io/api/v1/";
  token: string = "&token=bu4f8kn48v6uehqi3cqg";

  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


  /**
   * 
   * @param symbol get company profile the given symbol
   * @returns company profile
   */
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

  /**
   * build sentiment model from json response
   * @param responseList - input to be mapped  into model
   * @returns - list sentiments
   */
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

  /**
   * get quote for the given company symbol
   * @param symbol 
   * @returns 
   */
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
