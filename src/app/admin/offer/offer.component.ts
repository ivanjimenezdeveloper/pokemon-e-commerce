import { Store } from '@ngxs/store';
import { Component } from '@angular/core';
import { SetProductToCart } from 'src/app/store/shopping-cart/shopping-cart.action';
import { MockEmptyPokemonDetail } from 'src/app/mocks/pokemon.mock';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent {
  constructor() {}
}
