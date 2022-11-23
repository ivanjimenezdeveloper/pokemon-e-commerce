import { BehaviorSubject } from 'rxjs';
import {
  IPokemonDetails,
  IPokemonListApiResponse,
  IPokemonListItemApiResponse,
} from './../../models/pokemon.model';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  animations: [],
})
export class ShopComponent implements OnInit {
  constructor(private pokemonService: PokemonService) {}
  toggleMenu: boolean = false;
  numberOfProducts: number = 0;
  products: IPokemonListItemApiResponse[] = [];
  $pokemonFilter: BehaviorSubject<string> = new BehaviorSubject('');

  ngOnInit(): void {
    this.getProducts(20, 0);
  }

  getProducts(limit: number, offset: number) {
    this.pokemonService
      .getPokemonList(limit, offset)
      .subscribe((result: IPokemonListApiResponse) => {
        this.numberOfProducts = result.count;
        this.products = result.results;
      });
  }

  onPageChange(page: PageEvent): void {
    this.getProducts(page.pageSize, page.pageSize * page.pageIndex);
  }

  OnToggleMenu(): void {
    this.toggleMenu = !this.toggleMenu;
  }

  setFilter(filter: string): void {
    this.$pokemonFilter.next(filter);
  }
}
