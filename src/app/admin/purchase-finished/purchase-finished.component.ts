import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase-finished',
  templateUrl: './purchase-finished.component.html',
  styleUrls: ['./purchase-finished.component.scss'],
})
export class PurchaseFinishedComponent {
  constructor(private router: Router) {}

  navigateHome() {
    this.router.navigateByUrl('');
  }
}
