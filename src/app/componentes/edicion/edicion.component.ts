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

    this.subscripcion = this.puente.toggleEdicionObservable.subscribe(datos => {
      this.activo=this.puente.activo;
    })
  }
  
  @Input() tipo:any;
  @Input() id:any;
  //Usado solamente en resumen
  @Input() eliminar:boolean=true;
  
  subscripcion!: Subscription;
  activo:boolean=false;


  modal(tipo:string, id:number, accion:string){
    this.puente.abrirModalEditar(tipo,id,accion);
  }
  
}
