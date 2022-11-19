import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { MatButtonModule } from '@angular/material/button';

const MODULES_EXPORT = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MODULES_EXPORT],
  exports: [MODULES_EXPORT],
})
export class SharedModulesModule {}
