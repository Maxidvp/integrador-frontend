import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/servicios/modal.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.scss']
})
export class EducacionComponent implements OnInit {

  @Input() educacion: any;
  @Input() mostarIconos: any;
  @Input() accion: any;

  constructor(public modalS:ModalService) { }

  ngOnInit(): void {
    this.modalS.personaModal.educaciones[0].titulo=this.educacion.titulo;
    this.modalS.personaModal.educaciones[0].lugar=this.educacion.lugar;
    this.modalS.personaModal.educaciones[0].periodo=this.educacion.periodo;
    this.modalS.personaModal.educaciones[0].src=this.educacion.src;
  }
  
}


//elemText.setAttribute('contenteditable', true);