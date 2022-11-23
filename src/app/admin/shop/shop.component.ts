import { IPokemonDetails } from './../../models/pokemon.model';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  animations: [],
})
export class ShopComponent implements OnInit {
  constructor(private pokemonService: PokemonService) {}
  toggleMenu: boolean = false;
  products: IPokemonDetails[] = [];

  ngOnInit(): void {
    this.getProducts(20, 0);
  }

  getProducts(limit: number, offset: number) {
    this.pokemonService
      .getPokemonListDetailsVariable()
      .subscribe((result: IPokemonDetails[]) => {
        this.products = result;
      });
    this.pokemonService.getPokemonListDetails(limit, offset);
  }

  OnToggleMenu(): void {
    this.toggleMenu = !this.toggleMenu;
  }
}
