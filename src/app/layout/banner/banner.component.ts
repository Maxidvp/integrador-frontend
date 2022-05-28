import { Component, Input, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/servicios/persona.service';
import { ModalService } from 'src/app/servicios/modal.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  activo:boolean=false;
  @Input() banner:string='';
  @Input() mostarIconos: boolean=true;
  @Input() accion: string='ninguno';//'editar''agregar''eliminar'

  constructor(public modalS:ModalService) { }

  ngOnInit(): void {
    this.modalS.toggleEdicionObservable.subscribe(datos => {
      this.activo=datos;
    })
    if(this.accion=='editar'){
      this.modalS.personaModal.resumen.banner=this.banner;
    }
  }

}
