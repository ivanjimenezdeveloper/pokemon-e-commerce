import { QuantitySelectorComponent } from './../quantity-selector/quantity-selector.component';
import { ProductShoppingCartComponent } from './../product-shopping-cart/product-shopping-cart.component';
import { TotalsShoppingCartComponent } from './../totals-shopping-cart/totals-shopping-cart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantitySelectorComponent],
      declarations: [
        ShoppingCartComponent,
        TotalsShoppingCartComponent,
        ProductShoppingCartComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
