import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private userService: UserService) {}
  form: FormGroup;
  error: string;
  value: string = '';

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
            //Login y devolvemos a landing page
          } else {
            this.error = 'El usuario o contraseña son incorrectos';
          }
        });
    }
  }
}
