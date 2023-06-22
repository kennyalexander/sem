import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-asignados',
  templateUrl: './asignados.page.html',
  styleUrls: ['./asignados.page.scss'],
})
export class AsignadosPage implements OnInit {
  datos: any[] = [];
  

  constructor( private apiService: ApiService) { }

  ngOnInit() {
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
    this.apiService.getFilter().subscribe(
      (response: any[]) => {
        this.datos = response.sort((a: { id_reporte: number; }, b: { id_reporte: number; }) => a.id_reporte - b.id_reporte);
        this.datos = this.ordenarPorPrioridad(this.datos);
  
        // const base64String = "";
  
        // try {
        //   const decodedData = base64js.toByteArray(base64String);
        //   const encodedData = this.arrayBufferToBase64(decodedData);
        //   this.imagenDecodificada = 'data:image/png;base64,' + encodedData;
        //   console.log(decodedData);
        // } catch (error) {
        //   console.error(error);
        // }
      },
      (error) => { 
        console.error(error);
      }
    );
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

}
