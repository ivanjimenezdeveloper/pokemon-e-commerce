import { BehaviorSubject, Observable } from 'rxjs';
import {
  IPokemonDetails,
  IPokemonListApiResponse,
  IPokemonListItemApiResponse,
  IPokemonTypeAPI,
  ITypeAPI,
  ITypesListApiResponse,
} from './../../models/pokemon.model';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PageEvent } from '@angular/material/paginator';
import { ShoppingCartState } from 'src/app/store/shopping-cart/shopping-cart.state';
import { Select } from '@ngxs/store';
import { IShoppingCart } from 'src/app/models/shopping-cart.model';
import { ActivatedRoute } from '@angular/router';
import { IShopURLParams } from 'src/app/models/shop.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  animations: [],
})
export class ShopComponent implements OnInit {
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  @Select(ShoppingCartState.getProducts)
  //@ts-ignore
  $productsInCart: Observable<IShoppingCart>;

  toggleMenu: boolean = false;
  numberOfProducts: number = 0;
  products: IPokemonListItemApiResponse[] = [];
  productsInCart: IShoppingCart = {
    products: [],
    total: 0,
  };

  types: ITypeAPI[] = [];
  filterApplied: string = '';
  $pokemonFilter: BehaviorSubject<string> = new BehaviorSubject('');

  ngOnInit(): void {
    this.getProducts(20, 0);
    this.getTypes();
    this.getProductsInCart();
    this.getQueryParams();
  }

  getProducts(limit: number, offset: number): void {
    this.pokemonService
      .getPokemonList(limit, offset)
      .subscribe((result: IPokemonListApiResponse) => {
        this.numberOfProducts = result.count;
        this.products = result.results;
      });
  }

  getTypes(): void {
    this.pokemonService
      .getTypesList()
      .subscribe((typesResponse) => (this.types = typesResponse.results));
  }

  onPageChange(page: PageEvent): void {
    this.getProducts(page.pageSize, page.pageSize * page.pageIndex);
  }

  OnToggleMenu(): void {
    this.toggleMenu = !this.toggleMenu;
  }

  setFilter(filter: string): void {
    this.filterApplied = filter;
    this.$pokemonFilter.next(filter);
  }

  private getQueryParams() {
    this.route.queryParams.subscribe(
      // @ts-ignore
      (params: IShopURLParams) => {
        if (params.filter) this.setFilter(params.filter);
      }
    );
  }

  private getProductsInCart() {
    this.$productsInCart.subscribe(
      (productsInCart: IShoppingCart) => (this.productsInCart = productsInCart)
    );
  }
}
