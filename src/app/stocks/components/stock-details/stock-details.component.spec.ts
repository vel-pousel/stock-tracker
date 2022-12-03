import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { StockTrackerService } from '../../service/stock-tracker.service';

import { StockDetailsComponent } from './stock-details.component';

describe('StockDetailsComponent', () => {
  let component: StockDetailsComponent;
  let fixture: ComponentFixture<StockDetailsComponent>;

  const params: Subject<Params> = new Subject();
  const activatedRoute: ActivatedRoute | any = {
    params: params.asObservable(),
    snapshot: { data: {} },
    parent: { snapshot: { data: '' } }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [StockDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute, useValue: activatedRoute
        },
        { provide: Router, useValue: {} }, StockTrackerService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
