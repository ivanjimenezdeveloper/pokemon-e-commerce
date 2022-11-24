import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IData } from 'src/app/models/data.model';

@Injectable({
  providedIn: 'root',
})
export class LandingPageService {
  constructor(private router: Router) {}

  navigateToShop(type: string): void {
    this.router.navigate(['./shop'], { queryParams: { filter: type } });
  }
}
