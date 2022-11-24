import { LandingPageService } from './landing-page.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ILandingPageOffer } from './../../models/pokemon.model';
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
  constructor(
    private pokemonService: PokemonService,
    private landingPageService: LandingPageService
  ) {}
  offers: ILandingPageOffer[] = [];

  ngOnInit(): void {
    this.getOffers();
  }

  navigateToShop(type: string): void {
    this.landingPageService.navigateToShop(type);
  }

  private getOffers(): void {
    this.pokemonService
      .getOffers()
      .subscribe((offers: ILandingPageOffer[]) => (this.offers = offers));
  }
}
