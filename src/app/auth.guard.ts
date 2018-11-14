import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private isLoggedIn: boolean;

  constructor(private store: Store<any>, private router: Router) {
    this.store.select('authData')
      .pipe(
        takeWhile(authData => authData !== undefined)
      )
      .subscribe(
        authData => this.isLoggedIn = authData.isLoggedIn
      );
  }

  canActivate(): boolean {
    if (!this.isLoggedIn) {
      this.router.navigate(['']);
    }

    return !!this.isLoggedIn;
  }
}
