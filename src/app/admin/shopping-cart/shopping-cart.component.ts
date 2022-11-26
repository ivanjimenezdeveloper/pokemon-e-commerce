import { setRemoveProductsFromCart } from './../../store/shopping-cart/shopping-cart.action';
import { Router } from '@angular/router';
import { NotLoggedInComponent } from '../../shared-modules/dialogs/not-logged-in/not-logged-in.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IShoppingCart,
  IShoppingCartFormData,
  IShoppingCartProduct,
  IShoppingCartProductFormControls,
} from 'src/app/models/shopping-cart.model';
import { ShoppingCartState } from 'src/app/store/shopping-cart/shopping-cart.state';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from 'src/app/store/user/user.state';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared-modules/dialogs/error-dialog/error-dialog.component';

@Component({
  selector: 'app-shopping-cart',
  styleUrls: ['./shopping-cart.component.scss'],
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent implements OnInit {
  @Select(ShoppingCartState.getProducts)
  $productsInCart: Observable<IShoppingCart>;

  @Select(UserState.getUsername)
  $username: Observable<string>;

  username: string;
  form: FormGroup;
  productsInCart: IShoppingCart = {
    products: [],
    total: 0,
  };

  productsGroups: FormGroup<IShoppingCartProductFormControls>[];

  constructor(
    private fb: FormBuilder,
    private pokemonService: PokemonService,
    public dialog: MatDialog,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getUsername();
    this.getProductsInCart();
  }

  initForm(products: IShoppingCartProduct[]): void {
    if (products) {
      const productGroups: FormGroup<IShoppingCartProductFormControls>[] =
        products.map((shoppingCartProduct: IShoppingCartProduct) =>
          this.getProductsControl(shoppingCartProduct)
        );

      this.form = this.getForm(productGroups);

      if (this.username) this.form.patchValue({ username: this.username });
      //@ts-ignore
      this.productsGroups = this.form.controls.products.controls;
    }
  }

  onClickSubmit(): void {
    if (this.form.valid && this.username) {
      const purchase: IShoppingCartFormData = {
        products: this.form.value.products,
        username: this.form.value.username,
      };

      this.pokemonService.BuyProducts(purchase).subscribe((result: boolean) => {
        if (!result) {
          this.dialog.open(ErrorDialogComponent, { width: '250px' });
        } else {
          this.store.dispatch(new setRemoveProductsFromCart());
          this.router.navigateByUrl('purchase-finished');
        }
      });
    } else if (!this.form.valid && !this.username) {
      this.openNotLoggedInDialog();
    }
  }

  openNotLoggedInDialog(): void {
    const dialogRef = this.dialog.open(NotLoggedInComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.navigateLogin();
    });
  }

  private navigateLogin() {
    this.router.navigateByUrl('login');
  }

  private getUsername(): void {
    this.$username.subscribe((username: string) => {
      this.username = username;
    });
  }

  private getProductsInCart() {
    this.$productsInCart.subscribe((productsInCart: IShoppingCart) => {
      this.productsInCart = productsInCart;
      this.initForm(productsInCart.products);
    });
  }

  private getProductsControl(
    shoppingCartProduct: IShoppingCartProduct
  ): FormGroup<IShoppingCartProductFormControls> {
    return this.fb.group({
      quantity: this.fb.nonNullable.control<number>(
        shoppingCartProduct.quantity
      ),
      price: this.fb.nonNullable.control<number>(shoppingCartProduct.price),
      productId: this.fb.nonNullable.control<number>(
        shoppingCartProduct.product.id
      ),
      productName: this.fb.nonNullable.control<string>(
        shoppingCartProduct.product.name,
        Validators.min(0)
      ),
    });
  }

  private getForm(
    products: FormGroup<IShoppingCartProductFormControls>[]
  ): FormGroup {
    return this.fb.group({
      username: this.fb.control<string>('', Validators.required),
      products: this.fb.array(products, Validators.required),
    });
  }
}
