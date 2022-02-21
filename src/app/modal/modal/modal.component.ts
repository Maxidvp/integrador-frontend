import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/servicios/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  datos={
    'tipo':'ninguno',
    'id':0,
    'accion':'ninguno'//'editar' 'eliminar' 'agregar'
  };
  subscripcion!: Subscription;
  modal:boolean=false;
  mostrar:string='';
  
  constructor(private modalS: ModalService) { }

  ngOnInit(): void {
    //Se ejecuta cuando se clickea algun boton de edicion
    this.subscripcion = this.modalS.abrirModalEditarObservable.subscribe(datos => {
      if(datos.tipo!='ninguno'){
        this.mostrar='editor';
        this.abrir();//Activa el modal
      }
    })
    //Se ejecuta cuando se clickea algun boton de sesion
    this.subscripcion = this.modalS.abrirModalSesionObservable.subscribe(datos=>{
      if(datos!='ninguno'){
        this.mostrar='sesion';
        this.abrir();//Activa el modal
      }
    });
    //Se ejecuta cuando se clickea el boton de crear Mi Porfolio
    this.subscripcion = this.modalS.abrirModalInstanciaObservable.subscribe(datos=>{
      if(datos){
        this.mostrar='instancia';
        this.abrir();//Activa el modal
      }
    });
  }
  
  abrir(){
    document.getElementById('contenedor')!.style.filter="blur(5px)";
    this.modal=true;
  }
  cerrar(){
    document.getElementById('contenedor')!.style.filter="blur(0px)";
    this.modal=false;
  }
}