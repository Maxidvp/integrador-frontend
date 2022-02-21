import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

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

  getPersona(id:number): Observable<any>{
    const acces=localStorage.getItem('access_token');
    if(acces && id!=1){
      const headers = new HttpHeaders({'Authorization': `Bearer ${acces}`});
      return this.http.get<any>(`http://192.168.0.5:8080/personas/buscar/${id}`,{headers});
    }else{
      return this.http.get<any>(`http://192.168.0.5:8080/personas/buscar/1`);
    }
  }
  actualizarDB(): Observable<any>{
    const acces=localStorage.getItem('access_token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${acces}`});
    console.log('Tratando de enviar');
    return this.http.put<any>('http://192.168.0.5:8080/personas/editar', this.persona,{headers});//Fijate si podes crear un Persona tal que put<Persona>
  }

  instanciarPersona(accion:number): Observable<any>{
    console.log('En conexion service instanciar');
    const acces=localStorage.getItem('access_token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${acces}`});

    //let json=(accion)?this.persona:{"apellido":"Apellido","nombre":"Nombre"};//True copia | False crea vacio
    //console.log(json);
    return this.http.get<any>(`http://192.168.0.5:8080/personas/instancia/${accion}`,{headers});//Fijate si podes crear un Persona tal que put<Persona>
  }

/*
    //Puente entre Encabezado y Components
    private behaviorSubjectPersona = new BehaviorSubject({});
    conexionEncabezadoComponentsObservable = this.behaviorSubjectPersona.asObservable();
    conexionEncabezadoComponents(persona:any): void{
        this.behaviorSubjectPersona.next(persona);
    }*/
}
