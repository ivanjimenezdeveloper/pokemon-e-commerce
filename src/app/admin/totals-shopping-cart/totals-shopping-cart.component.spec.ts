import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsShoppingCartComponent } from './totals-shopping-cart.component';

describe('TotalsShoppingCartComponent', () => {
  let component: TotalsShoppingCartComponent;
  let fixture: ComponentFixture<TotalsShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalsShoppingCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalsShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
