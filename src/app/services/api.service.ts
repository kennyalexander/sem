import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public username: string = '';
  public reportar: string = 'http://127.0.0.1:8000/api/1.0/reporte/';
  public insumo: string = 'http://127.0.0.1:8000/api/1.0/solicitudlist/';
  private apiUrl = 'http://127.0.0.1:8000/api/1.0';

  constructor(private http: HttpClient) { }

  getDatos(): Observable<any> {
    const username = localStorage.getItem('username') ?? '';
    this.username = username;
    const url = `${this.apiUrl}/reportelist/?estado_r_id_estado=1`; // Reemplaza con el endpoint de tu API para obtener los datos
    return this.http.get(url);
  }

  getFilter(): Observable<any> {
    const username = localStorage.getItem('username');
    const url = `${this.apiUrl}/reportelist/?asignado=${username}&estado_r_id_estado=1`;
    console.log(username);
    return this.http.get(url);
  }
  
  getInsumo(): Observable<any> {
    const url = `${this.apiUrl}/insumolist/`;
    return this.http.get(url);
  }

  getSolicitud(filtro: string): Observable<any> {
    const username = localStorage.getItem('username');
    const url = `${this.apiUrl}/solicitudlist/?usuario_usuario=${username}&estado_s_id_estado_solicitud=${filtro}`;
    console.log(this.http.get(url));
    return this.http.get(url);
  }



}
