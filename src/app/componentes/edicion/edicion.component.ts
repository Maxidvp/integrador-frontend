import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../servicios/modal.service';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.scss']
})
export class EdicionComponent implements OnInit {
    
  //Si el seccion puede tener varios items se debe enviar el id correspondiente
  @Input() seccion:any;
  @Input() id:any;
  //Usado en resumen y redes
  @Input() eliminar:boolean=true;
  
  subscriptcion!: Subscription;
  activo:boolean=false;

  constructor(private modalS: ModalService) { }

  ngOnInit(): void {
    //Vuelvve visible los botones de edicion
    this.subscriptcion = this.modalS.toggleEdicionObservable.subscribe(datos => {
      this.activo=datos;
    })
  }

  modal(seccion:string, id:number, accion:string){
    this.modalS.abrirModal('editar',{seccion,id,accion});
  }
  
}
