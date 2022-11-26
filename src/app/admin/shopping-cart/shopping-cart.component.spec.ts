import { QuantitySelectorComponent } from './../quantity-selector/quantity-selector.component';
import { ProductShoppingCartComponent } from './../product-shopping-cart/product-shopping-cart.component';
import { TotalsShoppingCartComponent } from './../totals-shopping-cart/totals-shopping-cart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartComponent } from './shopping-cart.component';
import { NgxsModule, Store } from '@ngxs/store';
import { ShoppingCartState } from 'src/app/store/shopping-cart/shopping-cart.state';
import { UserState } from 'src/app/store/user/user.state';
import { HttpClientModule } from '@angular/common/http';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        QuantitySelectorComponent,
        NgxsModule.forRoot([ShoppingCartState, UserState]),
        HttpClientModule,
      ],
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
