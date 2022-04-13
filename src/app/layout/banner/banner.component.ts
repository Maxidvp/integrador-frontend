import { Component, Input, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/servicios/conexion.service';
import { ModalService } from 'src/app/servicios/modal.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  activo:boolean=false;
  @Input() banner:any;
  @Input() mostarIconos: boolean=true;
  @Input() accion: string='ninguno';//'editar''agregar''eliminar'

  constructor(public modalS:ModalService) { }

  ngOnInit(): void {
    this.modalS.personaModal.banner=this.banner;
    this.modalS.toggleEdicionObservable.subscribe(datos => {
      this.activo=datos;
    })
  }

}
