import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IShoppingCart,
  IShoppingCartProduct,
  IShoppingCartProductFormControls,
} from 'src/app/models/shopping-cart.model';
import { ShoppingCartState } from 'src/app/store/shopping-cart/shopping-cart.state';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from 'src/app/store/user/user.state';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  @Select(ShoppingCartState.getProducts)
  $productsInCart: Observable<IShoppingCart>;

  @Select(UserState.getUsername)
  $username: Observable<string>;

  username: string;
  form: FormGroup;
  productsInCart: IShoppingCart = {
    products: [],
    total: 0,
  };
  productsGroups: FormGroup<IShoppingCartProductFormControls>[];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getUsername();
    this.getProductsInCart();
  }

  initForm(products: IShoppingCartProduct[]): void {
    if (products) {
      const productGroups: FormGroup<IShoppingCartProductFormControls>[] =
        products.map((shoppingCartProduct: IShoppingCartProduct) =>
          this.getProductsControl(shoppingCartProduct)
        );

      this.form = this.getForm(productGroups);
      //@ts-ignore
      this.productsGroups = this.form.controls.products.controls;
    }
  }

  private getUsername(): void {
    this.$username.subscribe((username: string) => (this.username = username));
  }

  private getProductsInCart() {
    this.$productsInCart.subscribe((productsInCart: IShoppingCart) => {
      this.productsInCart = productsInCart;
      this.initForm(productsInCart.products);
    });
  }

  private getProductsControl(
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
        shoppingCartProduct.product.name,
        Validators.min(0)
      ),
    });
  }

  private getForm(
    products: FormGroup<IShoppingCartProductFormControls>[]
  ): FormGroup {
    return this.fb.group({
      username: this.fb.control<string>(''),
      products: this.fb.array([...products]),
    });
  }
}
