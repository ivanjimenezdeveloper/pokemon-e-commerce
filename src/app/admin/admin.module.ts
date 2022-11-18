import { SharedModulesModule } from './../shared-modules/shared-modules.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule,
    SharedModulesModule,
  ],
  declarations: [AdminComponent, LandingPageComponent, NavBarComponent],
})
export class AdminModule {}
