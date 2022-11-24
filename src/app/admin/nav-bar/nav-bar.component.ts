import { UserState } from './../../store/user/user.state';
import { IShoppingCart } from './../../models/shopping-cart.model';
import { ShoppingCartState } from './../../store/shopping-cart/shopping-cart.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { setLogOut } from 'src/app/store/user/user.action';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private store: Store) {}

  @Select(ShoppingCartState.getTotal)
  $total: Observable<number>;

  @Select(UserState.isLoggedIn)
  $isLoggedIn: Observable<boolean>;

  showMenuMobile: boolean = false;
  isMobile: boolean = false;
  resizeObservable$: Observable<Event> | undefined;
  resizeSubscription$: Subscription = new Subscription();
  total: number = 0;
  isLoggedIn: boolean = false;

  ngOnInit() {
    this.onResize();
    this.getTotal();
    this.getIsLoggedIn();
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

  logOut() {
    this.store.dispatch(new setLogOut());
  }

  private getIsLoggedIn(): void {
    this.$isLoggedIn.subscribe(
      (isLoggedIn: boolean) => (this.isLoggedIn = isLoggedIn)
    );
  }

  private getTotal(): void {
    this.$total.subscribe((total: number) => (this.total = total));
  }
}
