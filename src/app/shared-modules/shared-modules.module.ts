import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

const MODULES_EXPORT = [MatButtonModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MODULES_EXPORT],
  exports: [MODULES_EXPORT],
})
export class SharedModulesModule {}
