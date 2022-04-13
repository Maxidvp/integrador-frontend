import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personas } from 'src/app/interfaz/Personas';
import { ConexionService } from 'src/app/servicios/conexion.service';
import { ModalService } from 'src/app/servicios/modal.service';
import { SesionService } from 'src/app/servicios/sesion.service';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  @Input() miportfolio:boolean=false;
  @Input() encabezado:any;
  

  username:String='';
  //activo:boolean=false;
  constructor(private modalS:ModalService) { }

  ngOnInit(): void {
    /*//Si se pide que se muestren los elementos de edicion
    this.modalS.toggleEdicionObservable.subscribe(datos => {
      this.activo=datos;
    })*/
  }

  publico(){
    alert('cambio')
  }
  
}
