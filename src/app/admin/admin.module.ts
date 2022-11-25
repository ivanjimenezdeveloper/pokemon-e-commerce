import { SharedModulesModule } from './../shared-modules/shared-modules.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { OfferComponent } from './offer/offer.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './shop/shop.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { QuantitySelectorComponent } from './quantity-selector/quantity-selector.component';
import { ProductShoppingCartComponent } from './product-shopping-cart/product-shopping-cart.component';
import { TotalsShoppingCartComponent } from './totals-shopping-cart/totals-shopping-cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    LandingPageComponent,
    NavBarComponent,
    OfferComponent,
    ShoppingCartComponent,
    LoginComponent,
    ShopComponent,
    ProductCardComponent,
    ProductShoppingCartComponent,
    TotalsShoppingCartComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModulesModule,
    QuantitySelectorComponent,
  ],
})
export class AdminModule {}
