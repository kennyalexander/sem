import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.page.html',
  styleUrls: ['./sesion.page.scss'],
})
export class SesionPage implements OnInit {

  user: string = "";
  pass: string = "";
  estado: number = 1;

  constructor(private http: HttpClient, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  async presentAlert1() {
    const alert = await this.alertController.create({
      header: 'Respuesta Exitosa',
      message: 'Inicio de sesión exitoso.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlert2(mensaje: string | undefined) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  // 
  
  login() {
    const url = 'http://127.0.0.1:8000/api/1.0/usuario/?usuario=';
  
    // Crear un objeto con los datos de inicio de sesión
    const loginData = {
      user: this.user,
      password: this.pass,
      estado: this.estado
    };
  
    // Realizar la solicitud GET al servidor para obtener la lista de usuarios
    this.http.get<any[]>(url+loginData.user).subscribe(
      (response: any[]) => {
        let isAuthenticated = false;
        let errorMessage = '';
        let shouldShowErrorAlert = true;
  
        for (const user of response) {
          if (user.usuario === loginData.user) {
            if (user.contrasena === loginData.password) {
              if (user.estado_u_id_estado_u === loginData.estado) {
                isAuthenticated = true;
                console.log('Autenticación exitosa', user);
                this.presentAlert1();
                this.router.navigateByUrl('tabs', { state: { username: user.usuario } });
                shouldShowErrorAlert = false;
                break;
              } else {
                errorMessage = 'El usuario no está activo';
                this.presentAlert2(errorMessage);
                shouldShowErrorAlert = false;
                break;
              }
            } else {
              errorMessage = 'La contraseña no es correcta';
              this.presentAlert2(errorMessage);
              shouldShowErrorAlert = false;
              break;
            }
          } else {
            errorMessage = 'El usuario no es correcto';
          }
        }
  
        if (!isAuthenticated && shouldShowErrorAlert) {
          console.error(errorMessage);
          this.presentAlert2(errorMessage);
        }
      },
      (error) => {
        console.error('Error de autenticación', error);
        this.presentAlert2('¡Error algo ocurrió!');
      }
    );
  }
  

}
