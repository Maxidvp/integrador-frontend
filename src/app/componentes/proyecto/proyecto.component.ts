import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss']
})
export class ProyectoComponent implements OnInit {

  @Input() proyecto:any;
  @Input() mostarIconos: any;
  @Input() accion: any;

  constructor() { }

  ngOnInit(): void { }

}
