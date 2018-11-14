import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SetAuthStatus } from '../redux/actions';
import { loginConsts } from './login.const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.loginForm = this.getForm();
  }

  private getForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginUser(): void {
    const { username, password } = loginConsts.credentials;

    const usernameValue = this.loginForm.get('username').value;
    const passwordValue = this.loginForm.get('password').value;

    if (usernameValue === username && passwordValue === password) {
      this.store.dispatch(new SetAuthStatus(true));
      this.router.navigate(['planets']);
    } else {
      alert('Incorrect credentials!');
    }
  }
}
