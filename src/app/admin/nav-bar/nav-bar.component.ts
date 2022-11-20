import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  showMenuMobile: boolean = false;
  isMobile: boolean = false;
  resizeObservable$: Observable<Event> | undefined;
  resizeSubscription$: Subscription = new Subscription();

  ngOnInit() {
    this.onResize();
  }

  navegacionHome() {
    this.router.navigateByUrl('');
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
