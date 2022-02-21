import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/servicios/modal.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  activo:boolean=false;
  @Input() tipo:string='ninguno';

  constructor(private modalS: ModalService) { }

  ngOnInit(): void {
    this.modalS.toggleEdicionObservable.subscribe(datos => {
      this.activo=this.modalS.activo;
    })
  }

  modal(tipo:string, id:number, accion:string){
    console.log('Estoy en abrir modal agregar');
    this.modalS.abrirModalEditar(tipo,id,accion);
  }

}
