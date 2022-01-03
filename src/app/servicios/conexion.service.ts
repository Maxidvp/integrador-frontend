import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  constructor(private http: HttpClient) { }

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
}
