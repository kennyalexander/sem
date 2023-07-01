import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Promise<boolean> {
    const username = localStorage.getItem('username');

    if (username && username.trim() !== '') {
      return Promise.resolve(true);
    } else if (username) {
      this.router.navigate(['/tabs']);
      return Promise.resolve(false);
    } else {
      this.router.navigate(['/sesion']);
      return Promise.resolve(false);
    }
  }
}
