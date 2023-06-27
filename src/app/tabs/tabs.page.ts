import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';




@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  username: string = '';
  menuType: string = 'push';
  

  constructor(private router: Router, private alertController: AlertController, private menuController: MenuController) {}
  ngOnInit() {
    this.username = history.state.username;
  }

  navigateTo(page: string) {
    this.router.navigate([page], { state: { username: this.username } });
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
          }
        }
      ]
    });
  
    await alert.present();
  }


  openMenu() {
    this.menuController.open();
  }



}
