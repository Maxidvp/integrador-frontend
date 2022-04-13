import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/servicios/modal.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss']
})
export class ProyectoComponent implements OnInit {

  @Input() proyecto:any;
  @Input() mostarIconos: any;
  @Input() accion: any;

  constructor(public modalS:ModalService) { }

  ngOnInit(): void {
    //Setea los valores iniciiales del formulario
    if(this.accion=='agregar' || this.accion=='editar'){
      //Referencia al objeto modifica personaModal
      /*this.modalS.personaModal.proyectos[0]=this.proyecto;*/

      //Copia de la primitiva no modifica al modal
      this.modalS.personaModal.proyectos[0].titulo=this.proyecto.titulo;
      this.modalS.personaModal.proyectos[0].descripcion=this.proyecto.descripcion;
      this.modalS.personaModal.proyectos[0].periodo=this.proyecto.periodo;
      this.modalS.personaModal.proyectos[0].url=this.proyecto.url;
      this.modalS.personaModal.proyectos[0].fotos=this.proyecto.fotos;
    }
  }

}
