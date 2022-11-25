import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  IShoppingCartProduct,
  IShoppingCartProductFormControls,
} from 'src/app/models/shopping-cart.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private fb: FormBuilder) {}

  getProductsControl(
    shoppingCartProduct: IShoppingCartProduct
  ): FormGroup<IShoppingCartProductFormControls> {
    return this.fb.group({
      quantity: this.fb.nonNullable.control<number>(
        shoppingCartProduct.quantity
      ),
      price: this.fb.nonNullable.control<number>(shoppingCartProduct.price),
      productId: this.fb.nonNullable.control<number>(
        shoppingCartProduct.product.id
      ),
      productName: this.fb.nonNullable.control<string>(
        shoppingCartProduct.product.name
      ),
    });
  }

  getForm(products: FormGroup<IShoppingCartProductFormControls>[]): FormGroup {
    return this.fb.group({
      username: this.fb.control<string>(''),
      products: this.fb.array([...products]),
    });
  }
}
