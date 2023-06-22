import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reportar',
  templateUrl: './reportar.page.html',
  styleUrls: ['./reportar.page.scss'],
})
export class ReportarPage implements OnInit {

  username = this.apiService.username;

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

  constructor(private apiService: ApiService, private http: HttpClient) { }

  ngOnInit() {
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
        console.log('Formulario enviado con éxito', response);
        // Aquí puedes realizar acciones adicionales después de enviar el formulario
      },
      (error) => {
        console.error('Error al enviar el formulario', error);
        // Maneja el error de acuerdo a tus necesidades
      }
    );
  }
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.formulario.imagen = file;
  }

}
