import { IShoppingCart } from 'src/app/models/shopping-cart.model';
import { ShoppingCartState } from 'src/app/store/shopping-cart/shopping-cart.state';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  ngOnInit(): void {
    this.getProductsInCart();
  }
  @Select(ShoppingCartState.getProducts)
  //@ts-ignore
  $productsInCart: Observable<IShoppingCart>;

  productsInCart: IShoppingCart = {
    products: [],
    total: 0,
  };

  private getProductsInCart() {
    this.$productsInCart.subscribe(
      (productsInCart: IShoppingCart) => (this.productsInCart = productsInCart)
    );
  }
}
