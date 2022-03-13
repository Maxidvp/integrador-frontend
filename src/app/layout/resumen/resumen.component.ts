import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    console.log('resumen',this.resumen)
    var today = new Date();
    var birthDate = new Date(this.resumen.nacimiento);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.edad=age;
  }
}