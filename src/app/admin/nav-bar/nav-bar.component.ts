import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  constructor() {}

  showMenuMobile: boolean = false;
  mobile: boolean = false;
  resizeObservable$: Observable<Event> | undefined;
  resizeSubscription$: Subscription = new Subscription();

  ngOnInit() {
    this.onResize();
  }

  onResize() {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(
      (event: any) => {
        const windowSize = event.target.innerWidth;
        this.mobile = windowSize <= 700 ? true : false;
        if (!this.mobile && this.showMenuMobile) {
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
