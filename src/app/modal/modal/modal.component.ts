import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Personas } from 'src/app/Personas';
import { ConexionService } from 'src/app/servicios/conexion.service';
import { ModalService } from 'src/app/servicios/modal.service';
import { SesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(private data: ModalService, private conexion: ConexionService, private sesion: SesionService) { }

  datos={
    'tipo':'ninguno',
    'id':0,
    'accion':'ninguno'//'editar' 'eliminar' 'agregar'
  };
  subscripcion!: Subscription;
  modal:boolean=false;
  mostrar:string='';


  ngOnInit(): void {
    //Se ejecuta cuando se clickea algun boton de edicion
    this.subscripcion = this.data.abrirModalEditarObservable.subscribe(datos => {
      if(datos.tipo!='ninguno'){
        this.mostrar='editor';
        this.abrir();//Activa el modal
      }
    })
    this.subscripcion = this.data.abrirModalSesionObservable.subscribe(datos=>{
      if(datos!='ninguno'){
        this.mostrar='sesion';
        this.abrir();//Activa el modal
      }
    });
  }
  
  abrir(){
    this.modal=true;
    document.getElementById('contenedor')!.style.filter="blur(5px)";
  }
  cerrar(){
    this.modal=false;
    document.getElementById('contenedor')!.style.filter="blur(0px)";
  }
}