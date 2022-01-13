import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  constructor() { }

  activo:boolean=false;
  
  private behaviorSubject = new BehaviorSubject({'tipo':'ninguno','id':0,'accion':'ninguno'});//Metodos para comunicar entre componentes
  puenteModal = this.behaviorSubject.asObservable();//Observable a utilizar en el modal

  abrirModal(tipo: string, id:number, accion: string) {
    this.behaviorSubject.next({tipo,id,accion});//Aplica el nuevo valor a todos los atributos observables
  }
  
  private behaviorSubjectBool = new BehaviorSubject(false);
  puenteBool = this.behaviorSubjectBool.asObservable();

  toggleEdicion() {
    this.activo=!this.activo;
    this.behaviorSubjectBool.next(this.activo);//Aplica el nuevo valor a todos los atributos observables
  }
}
