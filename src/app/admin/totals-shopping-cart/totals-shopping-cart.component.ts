import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-totals-shopping-cart',
  templateUrl: './totals-shopping-cart.component.html',
  styleUrls: ['./totals-shopping-cart.component.scss'],
})
export class TotalsShoppingCartComponent {
  @Input()
  total: number = 0;

  @Output()
  OnClickSubmit = new EventEmitter();

  onClickSumbitForm(): void {
    this.OnClickSubmit.emit();
  }
}
