import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/servicios/conexion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.scss']
})
export class EducacionComponent implements OnInit {

  constructor(private conexion:ConexionService) { }

  educacion:any;

  ngOnInit(): void {
    this.conexion.getEducacion().subscribe((resp)=>this.educacion=resp.educacion);
  }
}
