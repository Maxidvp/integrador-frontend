import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/servicios/modal.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  activo:boolean=false;
  @Input() seccion:string='ninguno';

  singular:{
    [experiencias:string]:String,
    educaciones:String,
    proyectos:String
  }

  constructor(private modalS: ModalService) { 
    this.singular={
      experiencias:'experiencia',
      educaciones:'educación',
      proyectos:'proyecto'
    }
  }

  ngOnInit(): void {
    this.modalS.toggleEdicionObservable.subscribe(datos => {
      this.activo=this.modalS.activo;
    })
  }

  modal(seccion:string, id:number, accion:string){
    this.modalS.abrirModal('editar',{seccion,id,accion});
  }

  /*interface singular {
    name: string,
    country: string
  }*/


  /*singular={
    experiencias:'experiencia',
    educaciones:'educación',
    proyectos:'proyecto'
  }*/
}
