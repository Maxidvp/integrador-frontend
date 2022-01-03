import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/servicios/conexion.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {

  constructor(private conexion:ConexionService) { }
  listo:boolean=false;
  resumen:any;
  ngOnInit(): void {
      this.conexion.getResumen().subscribe((resp)=>{
        this.resumen=resp.resumen;
        this.listo=true;//Para evitar error al tratar de cargar los componentes que aun no llegaron
      })
  }
}