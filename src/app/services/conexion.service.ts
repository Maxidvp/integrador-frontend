import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Persona } from "../interfaz/Persona";

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  constructor(private http: HttpClient) { }

  backEndUrl = 'http://localhost:8080/personas';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' || 'application/text',
    })
  };
  httpOptions2 = {
    headers: new HttpHeaders({
      'Accept': 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    responseType: 'text' as const
  };

  getPersonas(): Observable<Persona[]>{
    return this.http.get<Persona[]>(this.backEndUrl+'/traer');
  }
  postPersona(persona:Persona): Observable<Persona>{
    return this.http.post<Persona>(this.backEndUrl+'/crear',persona);
  }
  editPersona(persona:Persona): Observable<Persona>{
    console.log(persona);
    console.log(this.backEndUrl+'/editar/'+persona.id);
    return this.http.put<Persona>(this.backEndUrl+'/editar/'+persona.id, persona);
  }
  deletePersona(id:number){
    return this.http.delete(this.backEndUrl+'/borrar/'+id, {responseType: 'text'});
  }
  serchPersona(id:number): Observable<Persona>{
    return this.http.get<Persona>(this.backEndUrl+'/buscar/'+id);
  }
}
