import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { StockInfo } from '../../model/StockInfo';
import { LocalStorageService } from '../../service/local-storage.service';

export const UP_ARROW: string = "\u{1F845}";
export const DOWN_ARROW: string = "\u{1F847}";

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.scss']
})
export class StockHomeComponent implements OnInit {

  stockList: StockInfo[] = [];
  errorMsg: string;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.loadStockList();
  }

  addStockQuote(stockQuote: StockInfo): void {
    this.errorMsg = "";
    this.localStorageService.setItem(stockQuote.symbol, JSON.stringify(stockQuote));
    this.loadStockList();
  }
  loadStockList(): void {
    this.stockList = this.localStorageService.getAllStocks();
  }

  removeStockQuote(stockQuote: StockInfo): void {
    this.errorMsg = "";
    this.localStorageService.removeItem(stockQuote.symbol);
    this.loadStockList();
  }

  onErrorMsg(error: string): void {
    this.errorMsg = error;
  }

}
