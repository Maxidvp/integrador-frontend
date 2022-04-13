import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/servicios/modal.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {

  @Input() resumen:any;
  @Input() mostarIconos:boolean=true;
  @Input() accion: string='ninguno';//'editar'

  edad?:number;

  constructor(public modalS:ModalService) { }

  ngOnInit(): void {
    
    if(this.accion=='editar'){
      //Warn: Mejorar esta seccion
      this.modalS.personaModal.foto=this.resumen.foto;
      this.modalS.personaModal.apellido=this.resumen.apellido;
      this.modalS.personaModal.nombre=this.resumen.nombre;
      this.modalS.personaModal.titulo=this.resumen.titulo;
      this.modalS.personaModal.direccion=this.resumen.direccion;
      this.modalS.personaModal.telefono=this.resumen.telefono;
      this.modalS.personaModal.email=this.resumen.email;
      this.modalS.personaModal.nacimiento=this.resumen.nacimiento;
      this.modalS.personaModal.sobremi=this.resumen.sobremi;
    }
  }

  anios(nacimiento:string) {
    let today = new Date();
    let birthDate = new Date(nacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}