import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Subject } from 'rxjs';

import { StockTrackerComponent } from './stock-tracker.component';

describe('StockTrackerComponent', () => {
  let component: StockTrackerComponent;
  let fixture: ComponentFixture<StockTrackerComponent>;
  const params: Subject<Params> = new Subject();


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [StockTrackerComponent],
      providers: [
        {
          provide: ActivatedRoute, useValue: {}
        },
        { provide: Router, useValue: {} },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
