import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../servicios/modal.service';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.scss']
})
export class EdicionComponent implements OnInit {

  constructor(private puente: ModalService) { }

  ngOnInit(): void {

    this.subscripcion = this.puente.puenteBool.subscribe(datos => {
      this.activo=this.puente.activo;
    })
  }
  
  subscripcion!: Subscription;
  @Input() tipo:any;
  @Input() id:any;

  activo:boolean=false;

  editar(tipo:string, id:number, accion:string){
    this.puente.abrirModal(tipo,id,accion);
  }
  
  eliminar(tipo:string, id:number, accion:string){
    this.puente.abrirModal(tipo,id,accion);
  }
}
