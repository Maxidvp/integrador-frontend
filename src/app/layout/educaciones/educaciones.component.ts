import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-educaciones',
  templateUrl: './educaciones.component.html',
  styleUrls: ['./educaciones.component.scss']
})
export class EducacionesComponent implements OnInit {

  constructor() { }

  @Input() educaciones:any;
  
  ngOnInit(): void {
  }

}
