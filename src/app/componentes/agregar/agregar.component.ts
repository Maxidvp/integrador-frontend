import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/servicios/modal.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {


  constructor(private puente: ModalService) { }

  activo:boolean=false;
  @Input() tipo:string='ninguno';
  
  ngOnInit(): void {
    this.puente.puenteBool.subscribe(datos => {
      this.activo=this.puente.activo;
    })
  }

  modal(tipo:string, id:number, accion:string){
    this.puente.abrirModal(tipo,id,accion);
  }

}
