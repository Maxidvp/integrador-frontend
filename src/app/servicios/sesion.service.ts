import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private http: HttpClient) { }

  actualizarToken(): Observable<any>{
    const refresh=localStorage.getItem('refresh_token');
    alert(`Bearer ${refresh}`);
    const headers = new HttpHeaders({'Authorization': `Bearer ${refresh}`});
    return this.http.get<any>('http://192.168.0.5:8080/api/token/refresh',{headers});//Fijate si podes crear un Persona tal que put<Persona>
  }
  //headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  logear(user:any):Observable<any>{
    console.log(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
 
    user=`username=${user.username}&password=${user.password}`;
    return this.http.post<any>('http://192.168.0.5:8080/api/login',user,{ headers, observe: 'response' });//
  }

  registrar(user:any):Observable<any>{
    console.log(user);
    //const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    //user=`username=${user.username}&password=${user.password}`;
    return this.http.post<any>('http://192.168.0.5:8080/api/user/save',user);//
  }

  //Puente para la variable de estado de sesion
  private behaviorSubjectsesionCabecera = new BehaviorSubject(false);
  sesionCabeceraObservable = this.behaviorSubjectsesionCabecera.asObservable();
  sesionCabecera():void{
    this.behaviorSubjectsesionCabecera.next(true);
  }
}
