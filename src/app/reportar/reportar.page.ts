import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportar',
  templateUrl: './reportar.page.html',
  styleUrls: ['./reportar.page.scss'],
})
export class ReportarPage implements OnInit {

  username = this.apiService.username;
  infopost: string ="";
  infotitle: string ="";

  formulario = {
    titulo: '',
    descripcion: '',
    usuario_usuario: this.username,
    prioridad_id_prioridad: '',
    piso_id_piso: '',
    sector_id_sector: '',
    sucursal_id_sucursal: '',
    imagen: null as File | null
  };

  

  constructor(private apiService: ApiService, private http: HttpClient, private toastController: ToastController, private router: Router) { }

  ngOnInit() {
  }

  async infoToast(title: string, info: string) {
    const toast = await this.toastController.create({
      header: this.infotitle,
      message: this.infopost,
      duration: 3000, // Duración en milisegundos para mostrar el Toast
      position: 'middle' // Posición en la que se mostrará el Toast ('top', 'bottom' o 'middle')
    });
  
    toast.present();
  }

  enviarFormulario() {
    const url = this.apiService.reportar;
  
    const formData = new FormData();
    formData.append('titulo', this.formulario.titulo);
    formData.append('descripcion', this.formulario.descripcion);
    formData.append('usuario_usuario', this.formulario.usuario_usuario);
    formData.append('prioridad_id_prioridad', this.formulario.prioridad_id_prioridad);
    formData.append('piso_id_piso', this.formulario.piso_id_piso);
    formData.append('sector_id_sector', this.formulario.sector_id_sector);
    formData.append('sucursal_id_sucursal', this.formulario.sucursal_id_sucursal);
  
    if (this.formulario.imagen !== null) {
      formData.append('imagen', this.formulario.imagen);
    }
  
    this.http.post(url, formData).subscribe(

      (response) => {
        const mensaje = JSON.stringify(response)
        const mensaje2 = mensaje.slice(1, -1);
        this.infotitle = "¡Enhorabuena!";
        this.infopost = mensaje2;
        this.infoToast(this.infotitle,this.infopost);
        console.log('Formulario enviado con éxito', response);
        this.router.navigateByUrl('tabs')
        this.limpiarFormulario();
        console.log(this.username);
      },
      (error) => {
        const mensaje = JSON.stringify(error)
        this.infotitle = "Algo ocurrio";
        this.infopost = "Reporte no enviado";
        this.infoToast(this.infotitle,this.infopost);
        console.error('Error al enviar el formulario', error);
        this.limpiarFormulario();
      }
    );
  }
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.formulario.imagen = file;
  }

  limpiarFormulario() {
    this.formulario.titulo = '';
    this.formulario.descripcion = '';
    this.formulario.usuario_usuario = '';
    this.formulario.prioridad_id_prioridad = '';
    this.formulario.piso_id_piso = '';
    this.formulario.sector_id_sector = '';
    this.formulario.sucursal_id_sucursal = '';
    this.formulario.imagen = null;
  }

}
