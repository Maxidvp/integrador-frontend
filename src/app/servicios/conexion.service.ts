import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { Personas } from '../interfaz/Personas';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  constructor(private http: HttpClient) { }

  persona:any;

  getHeader(){
    console.log('Vamos a iniciar la conexion');
  }
  backEndUrl='http://192.168.0.7:8080';
  //backEndUrl='https://app-prueba-1-arg.herokuapp.com';


  getPersona(id:number): Observable<any>{
    const acces=localStorage.getItem('access_token');
    if(acces && id!=1){
      const headers = new HttpHeaders({'Authorization': `Bearer ${acces}`});
      return this.http.get<any>(`${this.backEndUrl}/personas/buscar/${id}`,{ headers, observe: 'response' });
    }else{
      return this.http.get<any>(`${this.backEndUrl}/personas/buscar/1`);
    }
  }

  actualizarDB(): Observable<any>{
    const acces=localStorage.getItem('access_token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${acces}`});
    console.log('Tratando de enviar');
    return this.http.put<any>(`${this.backEndUrl}/personas/editar`, this.persona,{headers});//Fijate si podes crear un Persona tal que put<Persona>
  }

  instanciarPersona(accion:number): Observable<any>{
    console.log('En conexion service instanciar');
    const acces=localStorage.getItem('access_token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${acces}`});

    //let json=(accion)?this.persona:{"apellido":"Apellido","nombre":"Nombre"};//True copia | False crea vacio
    //console.log(json);
    return this.http.get<any>(`${this.backEndUrl}/personas/instancia/${accion}`,{headers});//Fijate si podes crear un Persona tal que put<Persona>
  }

  //Avisa cuando se produjo un cambio en persona
  private subjectPersona = new Subject();
  personaCambioObservable = this.subjectPersona.asObservable();
  personaCambio(persona:Personas): void{
      this.subjectPersona.next(persona);
  }

  getPublico(username:string): Observable<any>{
    return this.http.get<any>(`${this.backEndUrl}/personas/publico/${username}`);
  }

  togglePublico(estado:boolean): Observable<any>{
    console.log('En togglePublico');
    const refresh = localStorage.getItem('access_token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${refresh}`});
    //headers.set('Content-Type', 'text/plain; charset=utf-8');
    console.log(estado);
    return this.http.get(`${this.backEndUrl}/personas/togglepublico/${estado}`,{headers, responseType: 'text' as const,});
  }
}
