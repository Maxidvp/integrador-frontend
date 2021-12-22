import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ConexionService } from "../../services/conexion.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private administrarPersonas:ConexionService) { }

  ngOnInit(): void {
  }

  persona={
    'id':0,
    'nombre': '',
    'apellido': '',
    'edad': 0
  }


  headerTraer(){
    this.administrarPersonas.getPersonas().subscribe(data => this.mostrarTabla(data));
  }
  headerEnviar(){
    this.persona.id = -1;
    this.persona.nombre = (<HTMLInputElement>document.getElementById('headerNombre')).value,
    this.persona.apellido = (<HTMLInputElement>document.getElementById('headerApellido')).value,
    this.persona.edad = Number((<HTMLInputElement>document.getElementById('headerEdad')).value) 
    
    if(this.persona.nombre && this.persona.apellido && this.persona.edad){
      this.administrarPersonas.postPersona(this.persona).subscribe(()=>this.headerTraer());
    }else{
      alert(this.persona.toString())
    }
  }
  headerEditar(data:any){
    this.administrarPersonas.serchPersona(data).subscribe((resp)=>this.preparaEdicion(resp));
  }
  headerEliminar(id:number){
    this.administrarPersonas.deletePersona(id).subscribe(()=>this.headerTraer());
  }

  preparaEdicion(resp: any): void {
    this.persona=resp;
    (<HTMLInputElement>document.getElementById('headerNombre')).value=resp.nombre;
    (<HTMLInputElement>document.getElementById('headerApellido')).value=resp.apellido;
    (<HTMLInputElement>document.getElementById('headerEdad')).value=resp.edad;
    this.enviar_persona=false;
  }
  headerEnviarPesona(){
    this.persona.nombre = (<HTMLInputElement>document.getElementById('headerNombre')).value,
    this.persona.apellido = (<HTMLInputElement>document.getElementById('headerApellido')).value,
    this.persona.edad = Number((<HTMLInputElement>document.getElementById('headerEdad')).value) 
    this.administrarPersonas.editPersona(this.persona).subscribe(()=>this.headerTraer());
    this.enviar_persona=true;
  }

  personas:any=[];
  buleano : boolean=false;

  enviar_persona : boolean=true;

  mostrarTabla(data:any){
    this.personas=data;
    this.buleano=true;
  }
}

