import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  constructor(private http: HttpClient) { }

  persona:any;

  getHeader(){
    console.log('Vamos a iniciar la conexion');
  }
  backEndUrl='./assets/temporal.json';
  getEncabezado(): Observable<any>{
    return this.http.get<any>(this.backEndUrl);
  }//A eliminar

  getPersona(): Observable<any>{
    return this.http.get<any>('http://192.168.0.5:8080/personas/buscar/1');
  }
  actualizarDB(): Observable<any>{
    const acces=localStorage.getItem('access_token');

    const headers = new HttpHeaders({'Authorization': `Bearer ${acces}`});
    return this.http.put<any>('http://192.168.0.5:8080/personas/editar/1', this.persona,{headers});//Fijate si podes crear un Persona tal que put<Persona>
  }
}
