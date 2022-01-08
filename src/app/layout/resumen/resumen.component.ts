import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {

  constructor() { }

  @Input() resumen:any;

  listo:boolean=false;

  ngOnInit(): void {
      this.listo=true;//Para evitar error al tratar de cargar los componentes que aun no llegaron
  }
}