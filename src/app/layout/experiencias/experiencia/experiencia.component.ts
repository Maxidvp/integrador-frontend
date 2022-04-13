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
    this.modalS.personaModal.experiencias[0].lugar=this.experiencia.lugar;
    this.modalS.personaModal.experiencias[0].actividades=this.experiencia.actividades;
    this.modalS.personaModal.experiencias[0].periodo=this.experiencia.periodo;
    this.modalS.personaModal.experiencias[0].src=this.experiencia.src;
  }
  
}
