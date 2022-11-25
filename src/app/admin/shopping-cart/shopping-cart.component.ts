import { ShoppingCartService } from './shopping-cart.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {
  IShoppingCart,
  IShoppingCartProduct,
  IShoppingCartProductFormControls,
} from 'src/app/models/shopping-cart.model';
import { ShoppingCartState } from 'src/app/store/shopping-cart/shopping-cart.state';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, map } from 'rxjs';
import { UserState } from 'src/app/store/user/user.state';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  providers: [ShoppingCartService],
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

  constructor(
    private store: Store,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.getUsername();
    this.getProductsInCart();
  }

  initForm(products: IShoppingCartProduct[]): void {
    if (products) {
      const productGroups: FormGroup<IShoppingCartProductFormControls>[] =
        products.map((shoppingCartProduct: IShoppingCartProduct) =>
          this.shoppingCartService.getProductsControl(shoppingCartProduct)
        );

      this.form = this.shoppingCartService.getForm(productGroups);
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
}
