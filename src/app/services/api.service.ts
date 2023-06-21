import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  username: string = '';
  private apiUrl = 'http://127.0.0.1:8000/api/1.0'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  getDatos(): Observable<any> {
    const url = `${this.apiUrl}/reportelist/`; // Reemplaza con el endpoint de tu API para obtener los datos
    return this.http.get(url);
  }

  getFilter(username: string): Observable<any> {
    const url = `${this.apiUrl}/reportelist/?asignado=${this.username}`;
    console.log(this.username) // Reemplaza con el endpoint de tu API para obtener los datos
    return this.http.get(url);
  }
  
  getInsumo(): Observable<any> {
    const url = `${this.apiUrl}/insumolist/`;
    return this.http.get(url);
  }
}
