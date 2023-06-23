import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as base64js from 'base64-js';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {
  username: string = '';
  datos: any[] = [];
  imagenDecodificada: string = '';

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private modalController: ModalController) { }

  ngOnInit() {
    this.username = history.state.username;
    this.cargarDatos();
    this.datos = this.ordenarPorPrioridad(this.datos);
  }
  ordenarPorPrioridad(datos: any[]): any[] {
    return datos.sort((a, b) => {
      // Ordenar por prioridad
      if (a.prioridad_id_prioridad === 3 && b.prioridad_id_prioridad !== 3) {
        return -1; // Si a es rojo y b no lo es, a debe estar antes que b
      } else if (a.prioridad_id_prioridad !== 3 && b.prioridad_id_prioridad === 3) {
        return 1; // Si a no es rojo y b lo es, b debe estar antes que a
      } else if (a.prioridad_id_prioridad === 2 && b.prioridad_id_prioridad !== 2) {
        return -1; // Si a es amarillo y b no lo es, a debe estar antes que b
      } else if (a.prioridad_id_prioridad !== 2 && b.prioridad_id_prioridad === 2) {
        return 1; // Si a no es amarillo y b lo es, b debe estar antes que a
      }
  
      // Ordenar por id_reporte
      if (a.id_reporte < b.id_reporte) {
        return -1; // Si a.id_reporte es menor que b.id_reporte, a debe estar antes que b
      } else if (a.id_reporte > b.id_reporte) {
        return 1; // Si a.id_reporte es mayor que b.id_reporte, b debe estar antes que a
      } else {
        return 0; // Si a.id_reporte es igual a b.id_reporte, no hay cambio en el orden
      }
    });
  }


  cargarDatos() {
    this.apiService.getDatos().subscribe(
      (response: any[]) => {
        this.datos = response.sort((a: { id_reporte: number; }, b: { id_reporte: number; }) => a.id_reporte - b.id_reporte);
        this.datos = this.ordenarPorPrioridad(this.datos);
      },
      (error) => { 
        console.error(error);
      }
    );
  }

  
  

  arrayBufferToBase64(buffer: Uint8Array): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  mostrarImagen(url: string) {
    const imgElement = document.createElement('img');
    imgElement.src = url;
  
    // Aquí puedes hacer lo que necesites con el elemento de imagen (por ejemplo, agregarlo a un contenedor en tu HTML)
  }

  getPrioridadClass(prioridadId: number): string {
    if (prioridadId === 1) {
      return 'celeste-border';
    } else if (prioridadId === 2) {
      return 'amarillo-border';
    } else if (prioridadId === 3) {
      return 'rojo-border';
    } else {
      return '';
    }
  }

  isEstadoAbierto(estado: number): boolean {
    return estado === 1;
  }

  isEstadoCerrado(estado: number): boolean {
    return estado === 2;
  }

  ordenarLista(){
    window.location.reload();
  }

  abrirModal() {
    this.modalController.create({
      component: 'nombre-del-modal' // Reemplaza 'nombre-del-modal' por el nombre de tu modal en el archivo HTML
    }).then((modal) => {
      modal.present();
    });
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  guardarInsumo() {
    // Lógica para guardar los datos del insumo
    this.modalController.dismiss();
  }
}


