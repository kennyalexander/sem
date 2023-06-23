import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { ApiService } from './services/api.service';

const { Storage } = Plugins;
const USER_KEY = 'userIniciado';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private apiService: ApiService) {}

  canActivate(): Promise<boolean> {
    return Storage["get"]({ key: USER_KEY }) // Accedemos a la propiedad "get" utilizando corchetes
      .then((result: any) => { // Especificamos el tipo 'any' para el parámetro 'result'
        const userIniciado = result.value;
        if (userIniciado === 'true' && this.apiService.username !== '') {
          return true; // El usuario está iniciado y la variable 'username' contiene texto, permite el acceso
        } else {
          this.router.navigate(['/sesion']); // El usuario no está iniciado o la variable 'username' está vacía, redirige a la página de inicio de sesión
          return false;
        }
      })
      .catch(() => {
        this.router.navigate(['/sesion']); // Ocurrió un error al obtener la variable del almacenamiento local, redirige a la página de inicio de sesión
        return false;
      });
  }
}
