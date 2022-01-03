import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/servicios/conexion.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {

  constructor(private conexion:ConexionService) { }

  proyectos:any;

  ngOnInit(): void {
    this.conexion.getProyectos().subscribe((resp)=>this.proyectos=resp.proyectos);
  }

}
