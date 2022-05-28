import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Resumen } from 'src/app/interfaz/Personas';
import { ModalService } from 'src/app/servicios/modal.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit, OnChanges {

  @Input() resumen:Resumen=<Resumen>{};
  @Input() mostarIconos:boolean=true;
  @Input() accion: string='ninguno';//'editar'

  edad?:number;

  constructor(public modalS:ModalService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.edad=this.anios(changes['resumen'].currentValue.nacimiento);
  }

  ngOnInit(): void {
    if(this.accion=='editar'){
      this.modalS.personaModal.resumen={...this.resumen};
    }
  }

  calcularFecha(){
    ///-//////-///console.log('se dispara el calculom de la fecha')
    this.edad=this.anios(this.modalS.personaModal.resumen.nacimiento);
  }

  anios(nacimiento:string) {

    let today = new Date();
    
    const patter=/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if(!patter.test(nacimiento)){
      ///-//////-///console.log('fecha nula');
      return;
    }
    let birthDate = new Date(nacimiento);
    //Warn: fecha se llama multiples veces
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    ///-//////-///console.log('Fecha no nula: ', age);
    return age;
  }
}