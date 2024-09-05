import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const isAuthenticated = this.checkAuthentication();
    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/Login']);
      return false;
    }
  }

  checkAuthentication(): boolean {
    return !!localStorage.getItem('userToken');
  }
}