import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.scss']
})
export class ExperienciaComponent implements OnInit {

  @Input() experiencia: any;
  @Input() mostarIconos: any;
  @Input() accion: any;

  constructor() { }

  ngOnInit(): void { }
  
}
