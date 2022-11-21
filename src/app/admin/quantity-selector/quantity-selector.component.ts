import { SharedModulesModule } from './../../shared-modules/shared-modules.module';
import { Component } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.scss'],
  imports: [SharedModulesModule],
  standalone: true,
})
export class QuantitySelectorComponent {}
