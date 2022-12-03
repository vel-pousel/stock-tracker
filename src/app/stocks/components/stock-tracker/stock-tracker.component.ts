import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { StockInfo } from '../../model/StockInfo';
import { StockTrackerService } from '../../service/stock-tracker.service';

@Component({
  selector: 'stock-tracker',
  templateUrl: './stock-tracker.component.html',
  styleUrls: ['./stock-tracker.component.scss']
})
export class StockTrackerComponent implements OnInit {

  trackerForm: FormGroup;

  @Output() addStockQuote: EventEmitter<StockInfo> = new EventEmitter();
  @Output() onErrorMsg: EventEmitter<string> = new EventEmitter();


  enableBtn: boolean = false;
  errorMsg: string;
  isLoading: boolean = false;

  constructor(activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder, private stackTrackerService: StockTrackerService) { }

  ngOnInit(): void {
    this.trackerForm = this.fb.group({
      stockInput: [""],
    });
    this.trackerForm.get("stockInput").valueChanges.subscribe(selectedValue => {
      if (selectedValue) {
        this.enableBtn = true;
      } else {
        this.enableBtn = false;
      }
    })
  }

  trackStock(): void {
    let symbol: string = this.trackerForm.get('stockInput').value;
    this.isLoading = true;
    forkJoin([this.stackTrackerService.getStockQuote(symbol), this.stackTrackerService.getCompanyProfile(symbol)])
      .subscribe((response) => {
        this.isLoading = false;
        this.trackerForm.get('stockInput').setValue(null);
        let companyName: string = response[1]?.['name'];
        if (companyName) {
          let stockQuote: StockInfo = response[0];
          stockQuote.companyName = response[1]?.['name'];
          this.addStockQuote.emit(stockQuote);
        } else {
          this.onErrorMsg.emit('Quote not found for symbol: ' + symbol);
        }
      }, (error) => {
        this.isLoading = false;
        this.onErrorMsg.emit(error.error);
      });
  }

}
