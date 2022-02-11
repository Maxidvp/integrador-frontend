import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  constructor() { }

  activo:boolean=false;
  
  //Habilita y envia los datos al modal de edicion
  private behaviorSubject = new BehaviorSubject({'tipo':'ninguno','id':0,'accion':'ninguno'});//Metodos para comunicar entre componentes
  abrirModalEditarObservable = this.behaviorSubject.asObservable();//Observable a utilizar en el modal
  abrirModalEditar(tipo: string, id:number, accion: string) {
    this.behaviorSubject.next({tipo,id,accion});//Aplica el nuevo valor a todos los atributos observables
  }
  
  //habilita/deshabilita los botones de editar eliminar
  private behaviorSubjectBool = new BehaviorSubject(false);
  toggleEdicionObservable = this.behaviorSubjectBool.asObservable();
  toggleEdicion() {
    this.activo=!this.activo;
    this.behaviorSubjectBool.next(this.activo);//Aplica el nuevo valor a todos los atributos observables
  }

  //Abre el modal de acceder/registrar
  private behaviorSubjectString = new BehaviorSubject('ninguno');//Metodos para comunicar entre componentes
  abrirModalSesionObservable = this.behaviorSubjectString.asObservable();//Observable a utilizar en el modal
  abrirModalSesion(tipo:string) {
    /*alert('estoy');
    alert(tipo);*/
    this.behaviorSubjectString.next(tipo);//Aplica el nuevo valor a todos los atributos observables
  }

}
