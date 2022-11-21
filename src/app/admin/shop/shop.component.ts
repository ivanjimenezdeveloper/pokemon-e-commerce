import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
  toggleMenu: boolean = false;
  products = [1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5];
  OnToggleMenu(): void {
    this.toggleMenu = !this.toggleMenu;
  }
}
