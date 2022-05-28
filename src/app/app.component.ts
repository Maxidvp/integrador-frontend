import { Component, OnInit } from '@angular/core';
import { PersonaService } from './servicios/persona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor() { }
  
  title = 'integrador';

  ngOnInit(): void {  
    let clase=(localStorage.getItem('theme'))?localStorage.getItem('theme'):'light';
    document.body.className=clase!;
  }
  
}
