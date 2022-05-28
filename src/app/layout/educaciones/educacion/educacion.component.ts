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
    if(this.accion=='agregar' || this.accion=='editar'){
      this.modalS.personaModal.educaciones[0]={...this.educacion};
    }
  }
  
}