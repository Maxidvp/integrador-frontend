import { HttpClient } from '@angular/common/http';
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
  }
  getResumen(): Observable<any>{
    return this.http.get<any>(this.backEndUrl);
  }
  getExperiencias(): Observable<any>{
    return this.http.get<any>(this.backEndUrl);
  }
  getEducacion(): Observable<any>{
    return this.http.get<any>(this.backEndUrl);
  }
  getHabilidades(): Observable<any>{
    return this.http.get<any>(this.backEndUrl);
  }
  getProyectos(): Observable<any>{
    return this.http.get<any>(this.backEndUrl);
  }
  getPersona(): Observable<any>{
    return this.http.get<any>('http://192.168.0.5:8080/personas/buscar/1');
  }
  actualizarDB(): Observable<any>{
    return this.http.put<any>('http://192.168.0.5:8080/personas/editar/1', this.persona);//Fijate si podes crear un Persona tal que put<Persona>
  }

}
