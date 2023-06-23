import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { HttpClient } from '@angular/common/http';
import { AlertController, IonModal } from '@ionic/angular';

@Component({
  selector: 'app-asignados',
  templateUrl: './asignados.page.html',
  styleUrls: ['./asignados.page.scss'],
})
export class AsignadosPage implements OnInit {
  datos: any[] = [];
  modal!: IonModal;
  combobox: any;
  options: any[] = [];
  elementos: any[] = [];
  cantidad: number | undefined;
  mostrarConfirmar: boolean = false;
  descripcion: String = "";
  idrep: number | undefined;
  

  constructor( private apiService: ApiService, private http: HttpClient, private alertController: AlertController) { }

  ngOnInit() {
    this.cargarDatos();
    this.datos = this.ordenarPorPrioridad(this.datos);
    this.getInsumo();
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

  openModal(idReporte: number) {
    console.log('ID del reporte:', idReporte);
    this.idrep = idReporte;
    
  }

  getInsumo() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/1.0/insumolist/').subscribe(
      (response) => {
        this.options = response.map((item: any) => ({ label: item.insumo, id: item.id_insumo, stock: item.stock }));
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async confirm() {
    console.log(this.elementos);
    if (!this.combobox) {
      // Si no se ha seleccionado un insumo, seleccionar automáticamente el primer elemento de la lista
      if (this.elementos.length > 0) {
        this.combobox = this.elementos[0];


      } else {
        await this.presentAlert('Error', 'No se ha seleccionado un insumo');
        return;
      }
    }
  
    const idInsumo = this.combobox.id;
  
    if (!this.cantidad) {
      await this.presentAlert('Error', 'No se ha proporcionado una cantidad');
      return;
    }
  
    const stockActual = this.combobox.stock;
  
    const cantidadDescontar = this.cantidad;
  
    if (cantidadDescontar > stockActual) {
      await this.presentAlert('Error', 'La cantidad a descontar es mayor al stock disponible');
      return;
    }
  
    const nuevoStock = stockActual - cantidadDescontar;
  
    const url = `http://127.0.0.1:8000/api/1.0/insumoupd/${idInsumo}/`;
    const requestBody = { stock: nuevoStock };
  
    const putUrl = `http://127.0.0.1:8000/api/1.0/reporteupd/${this.idrep}/`;
    const putRequestBody = { desc_solucion: this.descripcion, estado_r_id_estado: '2' };

    try {
      await this.http.put(url, requestBody).toPromise();
  
      try {
        await this.http.put(putUrl, putRequestBody).toPromise();
        await this.presentAlert('Éxito', 'Reporte finalizado con éxito');
        this.cancel();
        
      } catch (error) {
        console.error('Error al realizar la petición POST hacia Reporte final', error);
        this.cancel();
      }
  
      // Eliminar el elemento de la lista
      const index = this.elementos.findIndex((elemento) => elemento.id === idInsumo);
      if (index !== -1) {
        this.elementos.splice(index, 1);
      }
    } catch (error) {
      console.error('Error al actualizar el stock:', error);
      await this.presentAlert('Error', 'Error al actualizar el stock');
    }

    const descripcion = this.descripcion;
    
  }
  
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  cancel() {
    window.location.reload();
    
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      
    }
  }

  agregarElemento() {
    if (!this.combobox) {
      console.log('No se ha seleccionado un insumo');
      return;
    }
    
    // Obtener el ID del insumo seleccionado
    const idInsumo = this.combobox.id;
  
    const elemento = {
      label: this.combobox,
      id: idInsumo, // Agregar el ID al elemento
      cantidad: this.cantidad
    };
    this.elementos.push(elemento);
    this.mostrarConfirmar = true;
  }

}