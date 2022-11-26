import { QuantitySelectorComponent } from './../quantity-selector/quantity-selector.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShoppingCartComponent } from './product-shopping-cart.component';
import { NgxsModule } from '@ngxs/store';
import { ShoppingCartState } from 'src/app/store/shopping-cart/shopping-cart.state';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ProductShoppingCartComponent', () => {
  let component: ProductShoppingCartComponent;
  let fixture: ComponentFixture<ProductShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        QuantitySelectorComponent,
        NgxsModule.forRoot([ShoppingCartState]),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ProductShoppingCartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
