import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/servicios/conexion.service';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.scss']
})
export class ExperienciasComponent implements OnInit {

  constructor(private conexion:ConexionService) { }

  experiencias:any;
  
  ngOnInit(): void {
    this.conexion.getExperiencias().subscribe((resp)=>this.experiencias=resp.experiencias);
  }
}
