import { Component, OnInit } from '@angular/core';
import { ConexionService } from './servicios/conexion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor(private conexion:ConexionService) { }
  
  title = 'integrador';

  persona:any;
  listo:boolean=false;

  ngOnInit(): void {
    this.conexion.getPersona().subscribe((resp)=>{
      this.conexion.persona=resp;
      this.persona=resp;
      //console.log(resp);
      this.listo=true;//Para evitar error al tratar de cargar los componentes que aun no llegaron
    })
  }
  
}


/*
constructor(private conexion:ConexionService) { }
listo:boolean=false;
resumen:any;
ngOnInit(): void {
    this.conexion.getResumen().subscribe((resp)=>{
      this.resumen=resp.resumen;
      this.listo=true;//Para evitar error al tratar de cargar los componentes que aun no llegaron
    })
}*/