import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { NotLoggedInComponentDialog } from './dialogs/not-logged-in-dialog/not-logged-in-dialog.component';

const MODULES_EXPORT = [
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatCardModule,
  MatPaginatorModule,
  MatDialogModule,
];

@NgModule({
  declarations: [ErrorDialogComponent, NotLoggedInComponentDialog],
  imports: [CommonModule, ...MODULES_EXPORT],
  exports: [MODULES_EXPORT],
})
export class SharedModulesModule {}
