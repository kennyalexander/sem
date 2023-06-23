import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Promise<boolean> {
    const username = localStorage.getItem('username'); // Obtener el valor almacenado en localStorage

    if (username && username.trim() !== '') {
      return Promise.resolve(true); // El usuario está iniciado y la variable 'username' contiene texto, permite el acceso
    } else if (username) {
      this.router.navigate(['/tabs']); // El usuario está iniciado, pero la variable 'username' está vacía, redirige a la página de tabs
      return Promise.resolve(false);
    } else {
      this.router.navigate(['/sesion']); // El usuario no está iniciado o la variable 'username' está vacía, redirige a la página de inicio de sesión
      return Promise.resolve(false);
    }
  }
}