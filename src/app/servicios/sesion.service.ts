import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private http: HttpClient) { }


  //headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  logear(user:any):Observable<any>{
    console.log(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
 
    user=`username=${user.username}&password=${user.password}`;
    return this.http.post<any>('http://192.168.0.5:8080/api/login',user,{ headers, observe: 'response' });//
  }

  registrar(user:any):Observable<any>{
    console.log(user);
    return this.http.post<any>('http://192.168.0.5:8080/api/user/save',user);//
  }

  //Puente para la variable de estado de sesion
  private behaviorSubjectsesionCabecera = new BehaviorSubject(false);
  sesionCabeceraObservable = this.behaviorSubjectsesionCabecera.asObservable();
  sesionCabecera():void{
    this.behaviorSubjectsesionCabecera.next(true);
  }

  
  //private behaviorSubjectVerificarToken = new BehaviorSubject('ninguno');
  private subscription1! : Subscription;
  private behaviorSubjectVerificarToken= new Subject();
  verificarTokenObservable = this.behaviorSubjectVerificarToken.asObservable();
  verificarToken(origen:string){
    console.log('En sesion service verificarToken');
    console.log(origen);
    //Decodificacion del token
    let token = localStorage.getItem('access_token')!;
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    let vencimiento = JSON.parse(jsonPayload).exp;
    let tiempoActual = Date.now()/1000;

    //Si el token expiro pide uno nuevo
    if(tiempoActual+10 > vencimiento){
      console.log('En sesion service verificarToken vencido');
        this.subscription1 = this.actualizarToken().subscribe(resp=>{
        //Luego de obtener el nuevo token avisa que puede continuar
        localStorage.setItem('access_token',resp.access_token);
        console.log('En sesion service verificarToken refrezcado');
        this.subscription1.unsubscribe();
        this.behaviorSubjectVerificarToken.next(origen);
        //this.behaviorSubjectVerificarToken.next('ninguno');
      });
    //Si el token NO expiro avisa que puede continuar
    }else{
      console.log('En sesion service verificarToken no vencido');
      this.behaviorSubjectVerificarToken.next(origen);
      //this.behaviorSubjectVerificarToken.next('ninguno');
    }
  }

  //Realiza el refresh token y devuelve true si lo logre
  /*refreshToken(origen:string): void{
    this.actualizarToken().subscribe(resp=>{
      localStorage.setItem('access_token',resp.access_token);
      this.behaviorSubjectsesionRefresh.next(origen);
    });
  }*/

  //Realiza el pedido del nuevo token a la api
  actualizarToken(): Observable<any>{
    console.log('En sesion service actualixarToken');
    const refresh = localStorage.getItem('refresh_token');
    //alert(`Bearer ${refresh}`);
    const headers = new HttpHeaders({'Authorization': `Bearer ${refresh}`});
    return this.http.get<any>('http://192.168.0.5:8080/api/token/refresh',{headers});
  }

  traerFotoPerfil(): Observable<any>{
    console.log('En traer Foto Perfil');
    const refresh = localStorage.getItem('access_token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${refresh}`});
    //headers.set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get('http://192.168.0.5:8080/api/foto',{headers, responseType: 'text' as const,});
  }
}
