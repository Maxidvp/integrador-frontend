import { AfterViewInit, Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ModalService } from 'src/app/servicios/modal.service';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-galeria-prev',
  templateUrl: './galeria-prev.component.html',
  styleUrls: ['./galeria-prev.component.scss']
})
export class GaleriaPrevComponent implements OnInit, OnChanges {

  @Input() accion:string='';
  @Input() galeria:Array<string>=[];
  fotos:Array<string>=[];
  mostrarGaleria:boolean=false;
  listo:boolean=false;

  constructor(public modalS:ModalService, private personaS:PersonaService) { }
  ngAfterViewInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    ///-//////-///console.log('changes gleria prev',changes)
    ///-//////-///console.log('gleria prev',this.galeria)
    //let accion=changes['accion'].currentValue;
    //if(accion=='editar' || accion=='crear')
    ///-//////-///console.log('Persona en galeria',this.personaS.persona)
    if(changes['galeria']){
      this.fotos=this.galeria;
      this.listo=true
    }
  }

  ngOnInit(): void {  
  }

  abrirGaleria(){
    ///-//////-//////-///console.log('this.fotos',this.fotos)
    if(!this.accion){//accion me indica si se debe iniciar el segundo modal
      this.modalS.abrirModal('galeria',this.fotos);
    }else if(this.accion=='editar' || this.accion=='agregar'){
      this.mostrarGaleria=true;
    }
  }
  cerrarGaleria(){
    this.mostrarGaleria=false;
  }
}
