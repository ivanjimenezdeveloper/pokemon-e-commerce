import { SetProductToCart } from './../../store/shopping-cart/shopping-cart.action';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { MockEmptyPokemonDetail } from 'src/app/mocks/pokemon.mock';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor() {}
  offers = [2, 3, 4, 4];
  ngOnInit(): void {}
}
