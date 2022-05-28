import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { PersonaService } from './persona.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private router: Router, private personaS:PersonaService) { }
  urlUsuario=this.personaS.backEndUrl+'/usuario';

  logear(user:any):Observable<any>{
    ///-//////-///console.log(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
 
    user=`username=${user.username}&password=${user.password}`;
    return this.http.post<any>(`${this.urlUsuario}/login`,user,{ headers, observe: 'response' });//
  }

  desloguear():void{
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    localStorage.removeItem('theme');
    this.router.navigate(['']);
    //Para que cargue el light mode
    location.reload();
  }

  registrar(user:any):Observable<any>{
    ///-//////-///console.log(user);
    return this.http.post<any>(`${this.urlUsuario}/user/save`,user);//
  }

  //Puente para la variable de estado de sesion
  private subjectsesionCabecera = new Subject();
  sesionCabeceraObservable = this.subjectsesionCabecera.asObservable();
  sesionCabecera():void{
    this.subjectsesionCabecera.next(true);
  }

  
  //private behaviorSubjectVerificarToken = new BehaviorSubject('ninguno');
  private subscription1! : Subscription;
  private behaviorSubjectVerificarToken= new Subject();
  verificarTokenObservable = this.behaviorSubjectVerificarToken.asObservable();
  verificarToken(origen:string){
    ///-//////-///console.log('sercicios>verificarToken:');
    //Decodificacion del token
    let token:String=localStorage.getItem('access_token')?localStorage.getItem('access_token')!:'';
    if(token=='undefined'){
      ///-//////-///console.log('Se detecto un toquen indefinido');
      this.desloguear();
    }
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    let vencimiento = JSON.parse(jsonPayload).exp;
    let tiempoActual = Date.now()/1000;

    //Si el token expiro pide uno nuevo
    if(tiempoActual+10 > vencimiento){
      ///-//////-///console.log('En sesion service verificarToken vencido');
      this.subscription1 = this.actualizarToken().subscribe({
        next:v=>{
          ///-//////-///console.log('v',v);
          //Luego de obtener el nuevo token avisa que puede continuar
          localStorage.setItem('access_token',v.body.access_token);
          ///-//////-///console.log('En sesion service verificarToken refrezcado');
          this.subscription1.unsubscribe();
          this.behaviorSubjectVerificarToken.next(origen);
          //this.behaviorSubjectVerificarToken.next('ninguno');
        },
        error:e=>{
          this.router.navigate(['error']);
        }
      });
    //Si el token NO expiro avisa que puede continuar
    }else{
      ///-//////-///console.log('En sesion service verificarToken no vencido');
      this.behaviorSubjectVerificarToken.next(origen);
      //this.behaviorSubjectVerificarToken.next('ninguno');
    }
  }

  //Realiza el pedido del nuevo token a la api
  actualizarToken(): Observable<any>{
    ///-//////-///console.log('En sesion service actualixarToken');
    const refresh = localStorage.getItem('refresh_token');
    //alert(`Bearer ${refresh}`);
    const headers = new HttpHeaders({'Authorization': `Bearer ${refresh}`});
    return this.http.get<any>(`${this.urlUsuario}/token/refresh`,{ headers, observe: 'response' });
  }

  traerFotoPerfil(): Observable<any>{
    ///-//////-///console.log('En traer Foto Perfil');
    const refresh = localStorage.getItem('access_token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${refresh}`});
    //headers.set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get(`${this.urlUsuario}/foto`,{headers, responseType: 'text' as const,});
  }

  usernameLibre(username:String):Observable<String>{
    ///-//////-///console.log('En usernameLibre');
    return this.http.get(`${this.urlUsuario}/usernamelibre/${username}`,{ responseType: 'text' as const,});
  }
  emailLibre(email:String):Observable<String>{
    ///-//////-///console.log('En emailLibre');
    return this.http.get(`${this.urlUsuario}/emaillibre/${email}`,{ responseType: 'text' as const,});
  }
}
