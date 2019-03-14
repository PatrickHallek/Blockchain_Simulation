import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionbookComponent } from './transactionbook.component';

describe('TransactionbookComponent', () => {
  let component: TransactionbookComponent;
  let fixture: ComponentFixture<TransactionbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
