import { Injectable } from '@angular/core';
import { StockInfo } from '../model/StockInfo';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getItem(key: string) {
    return localStorage.getItem(key)
  }
  public removeItem(key: string) {
    localStorage.removeItem(key);
  }
  public clear() {
    localStorage.clear();
  }

  /**
   * get all the stock items from the local storage
   * @returns list of all the stocks
   */
  getAllStocks(): StockInfo[] {
    let stockList: StockInfo[] = [];

    let keys = Object.keys(localStorage);
    let i = keys.length;

    while (i--) {
      stockList.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    return stockList;
  }

}
