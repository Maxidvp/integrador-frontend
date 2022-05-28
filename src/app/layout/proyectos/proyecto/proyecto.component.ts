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
  galeria:Array<string>=[];
  lista:string='';
  listo:boolean=false;

  constructor(public modalS:ModalService) { }

  ngOnInit(): void {
    //Setea los valores iniciales del formulario
    ///-//////-///console.log('proyecto.component',this.proyecto)
    if(this.accion=='agregar' || this.accion=='editar'){
      this.modalS.personaModal.proyectos[0]={...this.proyecto};
      //Lista es un auxiliar para mostrar la lista de enlaces en el texarea
      this.lista=this.modalS.personaModal.proyectos[0].fotos.join('\n');
      //Galeria es el vector temporal para pasar las fotos a galeria-prev
      //this.galeria=[...this.modalS.personaModal.proyectos[0].fotos];
    }
    this.listo=true;
  }

  //Convierte la lista de fotos en un array
  filtrarFotos(){
    this.modalS.personaModal.proyectos[0].fotos=[...this.modalS.filtrarUrls((<HTMLInputElement>document.getElementById('proFotos')).value)];
    ///-//////-///console.log('filtrarFotos',this.galeria)
    //this.modalS.personaModal.proyectos[0].fotos=this.galeria;
    return this.galeria;
  }
  //Vorver aca

}
