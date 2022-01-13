import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.scss']
})
export class EducacionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {  }

  @Input() educacion: any;
  @Input() mostarIconos: any;
  @Input() accion: any;
}


//elemText.setAttribute('contenteditable', true);