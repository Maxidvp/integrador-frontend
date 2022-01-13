import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/servicios/conexion.service';
import { ModalService } from 'src/app/servicios/modal.service';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  constructor(private conexion:ConexionService,private puente:ModalService) { }
  encabezado:any;
  ngOnInit(): void {
    this.conexion.getEncabezado().subscribe((resp)=>this.encabezado=resp);
    this.innerWidth = window.innerWidth;
  }
  innerWidth : any;
  
  activarEdicion(){
    this.puente.toggleEdicion();
  }
  togleModo(){
    //document.body.className.replace("dark","light");
    //alert('togleando');
    document.body.className =(document.body.className=='light')? 'dark':'light';
    document.getElementById('botonModo')!.innerHTML=(document.body.className=='light')?'Modo oscuro':'Modo claro';
  }

}
