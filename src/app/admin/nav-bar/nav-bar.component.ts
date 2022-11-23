import { IShoppingCart } from './../../models/shopping-cart.model';
import { ShoppingCartState } from './../../store/shopping-cart/shopping-cart.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, State } from '@ngxs/store';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  @Select(ShoppingCartState.getTotal)
  //@ts-ignore
  $total: Observable<number>;

  showMenuMobile: boolean = false;
  isMobile: boolean = false;
  resizeObservable$: Observable<Event> | undefined;
  resizeSubscription$: Subscription = new Subscription();
  total: number = 0;

  ngOnInit() {
    this.onResize();
    this.$total.subscribe((total: number) => (this.total = total));
  }

  navigateHome() {
    this.router.navigateByUrl('');
  }

  navigateShop() {
    this.router.navigateByUrl('shop');
  }

  navigateLogin() {
    this.router.navigateByUrl('login');
  }
  navigateShoppingCart() {
    this.router.navigateByUrl('shopping-cart');
  }

  onResize() {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(
      (event: any) => {
        const windowSize = event.target.innerWidth;
        this.isMobile = windowSize <= 700 ? true : false;
        if (!this.isMobile && this.showMenuMobile) {
          this.showMenuMobile = false;
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe();
  }

  toggleMenu() {
    this.showMenuMobile = !this.showMenuMobile;
  }
}
