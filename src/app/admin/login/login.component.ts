import { Router } from '@angular/router';
import { SetLoggedUser } from './../../store/user/user.action';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: string;
  value: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.nonNullable.group({
      username: this.fb.control<string>('', Validators.required),
      password: this.fb.control<string>('', Validators.required),
    });
  }

  onClickSubmit() {
    if (this.form.valid) {
      this.userService
        .checkLogIn(this.form.value.username, this.form.value.password)
        .subscribe((result) => {
          if (result) {
            this.store.dispatch(
              new SetLoggedUser({ username: this.form.value.username })
            );
            this.router.navigate(['./']);
          } else {
            this.error = 'El usuario o contraseña son incorrectos';
          }
        });
    }
  }
}
