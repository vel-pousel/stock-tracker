import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StockInfo } from '../../model/StockInfo';
import { DOWN_ARROW, UP_ARROW } from '../stock-home/stock-home.component';

@Component({
  selector: 'stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit {

  @Input() stockInfo: StockInfo;
  @Output() removeStockQuote: EventEmitter<StockInfo> = new EventEmitter();

  showStock: boolean;
  upIcon: string = UP_ARROW;
  downIcon: string = DOWN_ARROW;
  constructor() { }

  ngOnInit(): void {
    this.showStock = true;
  }

  closeStockInfo(): void {
    this.showStock = false;
    this.removeStockQuote.emit(this.stockInfo);
  }

}
