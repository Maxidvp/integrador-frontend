import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.scss']
})
export class ExperienciasComponent implements OnInit {

  constructor() { }

  @Input() experiencias:any;
  
  ngOnInit(): void {  }
}
