import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../servicios/modal.service';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.scss']
})
export class EdicionComponent implements OnInit {
    
  @Input() tipo:any;
  @Input() id:number=0;
  //Usado solamente en resumen
  @Input() eliminar:boolean=true;
  
  subscripcion!: Subscription;
  activo:boolean=false;

  constructor(private modalS: ModalService) { }

  ngOnInit(): void {

    this.subscripcion = this.modalS.toggleEdicionObservable.subscribe(datos => {
      this.activo=datos;
    })
  }

  modal(tipo:string, id:number, accion:string){
    this.modalS.abrirModalEditar(tipo,id,accion);
  }
  
}
