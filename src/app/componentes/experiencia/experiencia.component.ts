import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.scss']
})
export class ExperienciaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  //console.log(this.experiencia);
  }
  
  @Input() experiencia: any;
  @Input() mostarIconos: any;
  @Input() accion: any;
}
