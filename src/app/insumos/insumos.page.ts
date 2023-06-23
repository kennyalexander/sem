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

  formulario = {
    solicitud: '',
    fecha: '2023-06-23T15:13:19.385455Z',
    estado_s_id_estado_solicitud: '',
    sucursal_id_sucursal: '',
    usuario_usuario: this.username,
  };



  constructor(private apiService: ApiService, private alertController: AlertController, private http: HttpClient, private toastController: ToastController) { }

  ngOnInit() {
    this.cargarDatos({ target: { value: 'todos' } });
  }

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Alerta con formulario',
      inputs: [
        {
          name: 'solicitud',
          type: 'text',
          placeholder: 'Ingrese la solicitud',
          value: this.formulario.solicitud
        },
        // {
        //   name: 'fecha',
        //   type: 'date',
        //   placeholder: 'Ingrese la fecha',
        //   value: this.formulario.Fecha
        // },
        {
          name: 'estado',
          type: 'text',
          placeholder: 'Ingrese el estado',
          value: this.formulario.estado_s_id_estado_solicitud
        },
        {
          name: 'sucursal',
          type: 'text',
          placeholder: 'Ingrese la sucursal',
          value: this.formulario.sucursal_id_sucursal
        }
        // {
        //   name: 'usuario',
        //   type: 'text',
        //   placeholder: 'Ingrese el usuario',
        //   value: this.formulario.usuario_usuario
        // }
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
            this.formulario.estado_s_id_estado_solicitud = data.estado;
            this.formulario.sucursal_id_sucursal = data.sucursal;
            this.enviarFormulario();
            // Puedes hacer algo con los valores ingresados, como enviarlos a una API o almacenarlos en variables.
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


    console.log(this.formulario.solicitud);
    console.log(this.formulario.usuario_usuario);
    console.log(this.formulario.fecha);
    console.log(this.formulario.estado_s_id_estado_solicitud);
    console.log(this.formulario.sucursal_id_sucursal);

  
    this.http.post(urlinsumo, formData).subscribe(

      (response) => {
        const mensaje = JSON.stringify(response)
        const mensaje2 = mensaje.slice(1, -1);
        this.infotitle = "¡Gracias por reportar!";
        this.infopost = mensaje2;
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
          break; // Pendiente
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
          break; // Aprobado
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
          break; // Rechazado
        default:
          break;
      }
    }

    
  }
}
