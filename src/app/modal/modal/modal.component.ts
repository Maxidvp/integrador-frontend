import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/servicios/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  datos:any;/*={
    'seccion':'ninguno',
    'id':0,
    'accion':'ninguno'//'editar' 'eliminar' 'agregar'
  };*/
  subscripction!: Subscription;
  modal:boolean=false;
  mostrar:string=''; 
  
  
  constructor(private modalS: ModalService) { }

  ngOnInit(): void {
    //Para todos los modales
    this.subscripction = this.modalS.abrirModalObservable.subscribe(datos=>{
      ///-//////-///console.log(datos);
      if(datos.seccion){ 
        this.datos=datos.datos;
        this.mostrar=datos.seccion;
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