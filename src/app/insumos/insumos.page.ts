import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.page.html',
  styleUrls: ['./insumos.page.scss'],
})
export class InsumosPage implements OnInit {
  datos: any[] = [];
  datosFiltrados: any[] = [];
  filtrof: string = 'todos';
  muestraestado: string = '';
  username: string = localStorage.getItem('username') ?? '';
  infopost: string ="";
  infotitle: string ="";
  estados: string = '1' ?? '' ;
  sucursal: string = localStorage.getItem('sucursal') ?? '';

  formulario = {
    solicitud: '',
    fecha: '2023-06-23T15:13:19.385455Z',
    estado_s_id_estado_solicitud: this.estados ,
    sucursal_id_sucursal: this.sucursal,
    usuario_usuario: this.username,
  };



  constructor(private apiService: ApiService, private alertController: AlertController, private http: HttpClient, private toastController: ToastController) { }

  ngOnInit() {
    this.cargarDatos({ target: { value: 'p' } });
  }

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Realizar solicitud',
      inputs: [
        {
          name: 'solicitud',
          type: 'text',
          placeholder: 'Ingrese la solicitud',
          value: this.formulario.solicitud
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Alerta cancelada');
          }
        },
        {
          text: 'Guardar',
          handler: (data) => {
            console.log('Datos del formulario:', data);
            this.formulario.solicitud = data.solicitud;
            this.enviarFormulario();
          }
        }
      ]
    });

    await alert.present();
  }

  enviarFormulario() {

    const urlinsumo = this.apiService.insumo;
  
    const formData = new FormData();
    formData.append('solicitud', this.formulario.solicitud);
    formData.append('fecha', this.formulario.fecha);
    formData.append('estado_s_id_estado_solicitud', this.formulario.estado_s_id_estado_solicitud);
    formData.append('sucursal_id_sucursal', this.formulario.sucursal_id_sucursal);
    formData.append('usuario_usuario', this.formulario.usuario_usuario);
    console.log(this.formulario);
  
    this.http.post<any []>(urlinsumo, formData).subscribe(

      (response: any[]) => {
        const respuesta = response
        console.log(respuesta);
        const mensaje = JSON.stringify(response)
        const mensaje2 = mensaje.slice(1, -1);
        console.log(mensaje2);
        this.infotitle = "¡Gracias por reportar!";
        this.infopost = "Tu reposte sera revisado por un administrado";
        this.infoToast(this.infotitle,this.infopost);
        console.log('Formulario enviado con éxito', response);
        console.log(this.username);
      },
      (error) => {
        const mensaje = JSON.stringify(error)
        this.infotitle = "Malas noticias";
        this.infopost = "Reporte no enviado";
        this.infoToast(this.infotitle,this.infopost);
        console.error('Error al enviar el formulario', error);
      }
    );
  }

  async infoToast(title: string, info: string) {
    const toast = await this.toastController.create({
      header: this.infotitle,
      message: this.infopost,
      duration: 3000,
      position: 'middle'
    });
  
    toast.present();
  }

  cargarDatos(event: any) {
    const estado = event.target.value;
    this.filtrof = estado;
    if (this.filtrof === 'todos') {
      this.apiService.getSolicitud('').subscribe(
        (response: any[]) => {
          this.datos = response.sort((a: { id_solicitud: number; }, b: { id_solicitud: number; }) => a.id_solicitud - b.id_solicitud);
          this.datosFiltrados = [...this.datos]; // Inicializar datosFiltrados con los mismos valores que datos
          return;
        },
        (error) => { 
          console.error(error);
          return;
        }
      );
    } else {
      switch (this.filtrof) {
        case 'p':
          this.apiService.getSolicitud('1').subscribe(
            (response: any[]) => {
              this.datos = response.sort((a: { id_solicitud: number; }, b: { id_solicitud: number; }) => a.id_solicitud - b.id_solicitud);
              this.datosFiltrados = [...this.datos]; // Inicializar datosFiltrados con los mismos valores que datos
            },
            (error) => { 
              console.error(error);
            }
          );
          break;
        case 'a':
          this.apiService.getSolicitud('2').subscribe(
            (response: any[]) => {
              this.datos = response.sort((a: { id_solicitud: number; }, b: { id_solicitud: number; }) => a.id_solicitud - b.id_solicitud);
              this.datosFiltrados = [...this.datos]; // Inicializar datosFiltrados con los mismos valores que datos
            },
            (error) => { 
              console.error(error);
            }
          );
          break;
        case 'r':
          this.apiService.getSolicitud('3').subscribe(
            (response: any[]) => {
              this.datos = response.sort((a: { id_solicitud: number; }, b: { id_solicitud: number; }) => a.id_solicitud - b.id_solicitud);
              this.datosFiltrados = [...this.datos]; // Inicializar datosFiltrados con los mismos valores que datos
            },
            (error) => { 
              console.error(error);
            }
          );
          break;
        default:
          break;
      }
    }

    
  }
}
