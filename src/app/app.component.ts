import { Component, Renderer2, AfterViewInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  nombre = localStorage.getItem('nombre');
  email = localStorage.getItem('email');
  imagen = localStorage.getItem('imagen');
  cargo = localStorage.getItem('cargo');
  sucursal = localStorage.getItem('sucursal');
  username = localStorage.getItem('username');

  menuType: string = 'push';
  accordionGroup: any;
  password: string = '';
  confirmPassword: string = '';
  currentPassword: string = '';
  urlpass = `http://127.0.0.1:8000/api/1.0/passupd/`+this.username;
  fotousr: any;
  emailusr: any;
  sucursalusr: any;
  constructor(private router: Router,private alertController: AlertController,private menuController: MenuController, private renderer: Renderer2, private http: HttpClient) {}
  ngOnInit() {
    this.cargarDatos();
  }
  ngAfterViewInit() {
    const isDark = localStorage.getItem('colorTheme');
    if (isDark !== null) {
      this.applyColorTheme(JSON.parse(isDark));
    }
  }
  

  onToggleColorTheme(event: any) {
    const isChecked = event.detail.checked;
    localStorage.setItem('colorTheme', JSON.stringify(isChecked));
    this.applyColorTheme(isChecked);
  }

  applyColorTheme(isDark: boolean) {
    const theme = isDark ? 'dark' : 'light';
    this.renderer.setAttribute(document.body, 'color-theme', theme);
  
  }

  cargarDatos(){

    this.nombre = localStorage.getItem('nombre');
    this.email = localStorage.getItem('email');
    this.imagen = localStorage.getItem('imagen');
    this.cargo = localStorage.getItem('cargo');
    this.sucursal = localStorage.getItem('sucursal');
    this.username = localStorage.getItem('username');

  }



  openMenu() {
    this.menuController.open();
  }

  closeMenu() {
    this.menuController.close();
  }

  async confirmarCerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // Acción a realizar al hacer clic en el botón "Cancelar"
            console.log('Cierre de sesión cancelado');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            // Acción a realizar al hacer clic en el botón "Aceptar"
            this.cerrarSesion();
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  cerrarSesion() {
    localStorage.setItem('rut', '');
    localStorage.setItem('nombre', '');
    localStorage.setItem('email', '');
    localStorage.setItem('imagen', '');
    localStorage.setItem('cargo', '');
    localStorage.setItem('sucursal', '');
    localStorage.setItem('username', '');
    window.location.reload();
    this.router.navigate(['/sesion']);
  }

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  verificaActualPass() {

    this.http.get(this.urlpass)
      .subscribe(
        (response: any) => {
          console.log(response);
          const currentPasswordFromAPI = response.contrasena;
  
          if (currentPasswordFromAPI === this.currentPassword) {
            // La contraseña actual es correcta, permite al usuario cambiarla
            this.comparapass();
          } else {
            // La contraseña actual no es correcta, muestra una alerta al usuario
            this.presentAlert('Error', 'La contraseña actual no es correcta.');
          }
        },
        error => {
          // Ocurrió un error al obtener la contraseña actual, muestra una alerta de error
          this.presentAlert('Error', 'Ocurrió un error al obtener la contraseña actual.');
        }
      );
  }

  comparapass() {
    if (this.password === this.confirmPassword) {
      // Las contraseñas coinciden, realiza la llamada a la API para cambiar la contraseña
      this.cambiarpasseapi();
    } else {
      // Las contraseñas no coinciden, muestra una alerta al usuario
      this.presentAlert('Error', 'Las contraseñas no coinciden.');
    }
  }

    cambiarpasseapi() {
      const newPassword = { contrasena: this.password };
      console.log(newPassword);
    
      this.http.put(this.urlpass, newPassword)
        .subscribe(
          response => {
            // La contraseña se actualizó correctamente, muestra una alerta de éxito
            this.presentAlert('Éxito', 'Contraseña actualizada correctamente.');
          },
          error => {
            // Ocurrió un error al cambiar la contraseña, muestra una alerta de error
            this.presentAlert('Error', 'Ocurrió un error al cambiar la contraseña.');
          }
        );
    }


    


}