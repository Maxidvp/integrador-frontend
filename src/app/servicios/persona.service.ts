import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { Personas } from '../interfaz/Personas';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient, private modalS:ModalService) { }

  persona:any;

  backEndUrl='http://localhost:8080';
  
  urlPersona=this.backEndUrl+'/persona';

  getPersona(id:number): Observable<any>{
    ///-//////-///console.log('persona.service - getPersona');
    const acces=localStorage.getItem('access_token');
    if(acces && id!=1){
      const headers = new HttpHeaders({'Authorization': `Bearer ${acces}`});
      return this.http.get<any>(`${this.urlPersona}/buscar/${id}`,{ headers, observe: 'response' });
    }else{
      return this.http.get<any>(`${this.urlPersona}/buscar/1`);
    }
  }

  agregarDB(seccion:string, json:Personas): Observable<any>{
    ///-//////-///console.log('persona.service - crearDB');
    //let json:Personas=this.paqueteAEnviar(seccion);
    const acces=localStorage.getItem('access_token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${acces}`});
    return this.http.post<any>(`${this.urlPersona}/agregar/${seccion}`, json, {headers});//this.modalS.personaModal[seccion as keyof Personas]
  }

  editarDB(seccion:string, json:Personas): Observable<any>{
    ///-//////-///console.log('persona.service - editarDB');
    //let json:Personas=this.paqueteAEnviar(seccion);
    const acces=localStorage.getItem('access_token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${acces}`});
    return this.http.put<any>(`${this.urlPersona}/editar/${seccion}`, json, {headers});//this.modalS.personaModal[seccion as keyof Personas]
  }

  eliminarDB(seccion:string,id:number): Observable<any>{
    ///-//////-///console.log('persona.service - eliminarDB');
    const acces=localStorage.getItem('access_token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${acces}`});
    return this.http.delete<any>(`${this.urlPersona}/eliminar/${seccion}/${id}`,{headers});
  }

  instanciarPersona(accion:number): Observable<any>{
    ///-//////-///console.log('persona.service - instanciarPersona');
    const acces=localStorage.getItem('access_token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${acces}`});
    return this.http.get<any>(`${this.urlPersona}/instancia/${accion}`,{headers});//Fijate si podes crear un Persona tal que put<Persona>
  }

  //Avisa cuando se produjo un cambio en persona
  private subjectPersona = new Subject();
  personaCambioObservable = this.subjectPersona.asObservable();
  personaCambio(persona:Personas): void{
    ///-//////-///console.log('persona.service - personaCambio');
    this.subjectPersona.next(persona);
  }

  getPublico(username:string): Observable<any>{
    ///-//////-///console.log('persona.service - getPublico');
    return this.http.get<any>(`${this.urlPersona}/publico/${username}`);
  }

  togglePublico(estado:boolean): Observable<any>{
    ///-//////-///console.log('persona.service - togglePublico');
    const refresh = localStorage.getItem('access_token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${refresh}`});
    //headers.set('Content-Type', 'text/plain; charset=utf-8');
    ///-//////-///console.log(estado);
    return this.http.get(`${this.urlPersona}/togglepublico/${estado}`,{headers, responseType: 'text' as const,});
  }
}
