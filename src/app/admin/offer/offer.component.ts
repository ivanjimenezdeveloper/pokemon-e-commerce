import { PokemonService } from 'src/app/services/pokemon.service';
import { ILandingPageOffer } from './../../models/pokemon.model';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  constructor(private pokemonService: PokemonService) {}
  @Input()
  offer: ILandingPageOffer = {
    subtitle: '',
    title: '',
    description: '',
    type: '',
  };

  @Output() onNavigate = new EventEmitter<string>();

  image: string =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png';

  ngOnInit(): void {
    this.getImage();
  }

  onClickBuy(type: string) {
    this.onNavigate.emit(type);
  }

  getImage(): void {
    this.pokemonService
      .getPokemonImageByType(this.offer.type)
      .subscribe((image) => (this.image = image));
  }
}
