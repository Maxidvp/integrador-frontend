import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/servicios/conexion.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  constructor(private conexion:ConexionService) { }
  encabezado:any;
  ngOnInit(): void {
    this.conexion.getEncabezado().subscribe((resp)=>this.encabezado=resp);
  }

}
