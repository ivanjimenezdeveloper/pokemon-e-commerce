import { FormGroup, FormControl } from '@angular/forms';
import { PokemonService } from 'src/app/services/pokemon.service';
import { SetProductToCart } from './../../store/shopping-cart/shopping-cart.action';
import { MockShoppingCartProducts } from './../../mocks/shopping-cart.mock';
import {
  IShoppingCart,
  IShoppingCartProduct,
} from 'src/app/models/shopping-cart.model';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { IPokemonDetails } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-product-shopping-cart',
  templateUrl: './product-shopping-cart.component.html',
  styleUrls: ['./product-shopping-cart.component.scss'],
})
export class ProductShoppingCartComponent implements OnInit {
  @Input()
  productsInCart: IShoppingCart = {
    products: [],
    total: 0,
  };

  @Input()
  product: IShoppingCartProduct = { ...MockShoppingCartProducts };

  @Input()
  form: FormGroup;

  quantitySelected: number = 0;
  constructor(private store: Store, private pokemonService: PokemonService) {}
  ngOnInit(): void {
    this.quantitySelected = this.getQuantityFromShoppingCart(
      this.product.product
    );
  }

  setProductInCart(quantitySelected: number) {
    if (this.product.product) {
      this.quantitySelected = quantitySelected;
      this.store.dispatch(
        new SetProductToCart({
          product: { ...this.product.product },
          quantity: this.quantitySelected,
          price: this.product.price,
        })
      );
    }
  }

  private getQuantityFromShoppingCart(pokemon: IPokemonDetails): number {
    return this.pokemonService.getQuantityFromShoppingCart(
      this.productsInCart.products,
      pokemon.id
    );
  }
}
