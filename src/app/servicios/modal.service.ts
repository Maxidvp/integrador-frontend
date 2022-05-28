import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Personas } from '../interfaz/Personas';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  constructor() { }

  activo:boolean=false;
  

  //Habilita y envia los datos al modal
  private behaviorSubject = new BehaviorSubject({seccion:'',datos:[]});//Metodos para comunicar entre componentes
  abrirModalObservable = this.behaviorSubject.asObservable();//Observable a utilizar en el modal
  abrirModal(seccion: string, datos: any) {
    this.behaviorSubject.next({seccion,datos});//Aplica el nuevo valor a todos los atributos observables
  }

  //habilita/deshabilita los botones de editar eliminar
  private behaviorSubjectBool = new BehaviorSubject(false);
  toggleEdicionObservable = this.behaviorSubjectBool.asObservable();
  toggleEdicion() {
    this.activo=!this.activo;//Invierte el estado de los botones de edicion
    this.behaviorSubjectBool.next(this.activo);//Aplica el nuevo valor a todos los atributos observables
  }

  public filtrarUrls(fotos:string){
    let vectorFotos=fotos.split(/[;,\n]/);
    let sinEspacios=vectorFotos.map(foto=> foto.trim());
    let filtrado=sinEspacios.filter(foto=> /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(foto));
    ///-//////-///console.log('filtrado',filtrado)
    return filtrado;
  }

  public filtrarUrl(foto:string){
    return foto?
      (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(foto.trim())) ? foto.trim() : ''
      :
      '';
  }

  personaModal:Personas={
    publico:false,
    resumen: {
      nombre: "",
      apellido: "",
      titulo: "",
      direccion: "",
      telefono: "",
      email: "",
      nacimiento: "",
      foto: "",
      banner: "",
      sobremi: "",
    },
    educaciones: 
        [
          {
            periodo: "",
            lugar: "",
            titulo: "",
            imagen: ""
          }
        ],
    experiencias: 
        [
          {
            periodo: "",
            lugar: "",
            actividades: "",
            imagen: ""
          }
        ],
    habilidades: 
        [
          {
            habilidad: "",
            valor: 100
          }
        ],
    proyectos: 
        [
          {
            titulo: "",
            periodo: "",
            descripcion: "",
            url: "",
            fotos: []
          }
        ],
    redes:[]
  }
}
