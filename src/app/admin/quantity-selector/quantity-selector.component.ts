import { SharedModulesModule } from './../../shared-modules/shared-modules.module';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.scss'],
  imports: [SharedModulesModule],
  standalone: true,
})
export class QuantitySelectorComponent {
  @Input()
  quantitySelected: number = 0;

  @Output() onChange = new EventEmitter<number>();

  onChangeQuantity(quantity: number) {
    this.onChange.emit(this.quantitySelected + quantity);
  }
}
