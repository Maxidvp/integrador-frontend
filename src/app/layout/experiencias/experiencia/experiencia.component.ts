import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/servicios/modal.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.scss']
})
export class ExperienciaComponent implements OnInit {

  @Input() experiencia: any;
  @Input() mostarIconos: any;
  @Input() accion: any;

  constructor(public modalS:ModalService) { }

  ngOnInit(): void {
    if(this.accion=='agregar' || this.accion=='editar'){
      this.modalS.personaModal.experiencias[0]={...this.experiencia};
    }
  }
  
}
