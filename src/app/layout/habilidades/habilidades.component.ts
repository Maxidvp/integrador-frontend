import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/servicios/conexion.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.scss']
})
export class HabilidadesComponent implements OnInit {

  constructor(private conexion:ConexionService) { }

  habilidades:any;

  ngOnInit(): void {
    this.conexion.getHabilidades().subscribe((resp)=>this.habilidades=resp.habilidades);
  }


}

