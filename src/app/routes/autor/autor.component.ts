import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Personas } from 'src/app/interfaz/Personas';
import { ConexionService } from 'src/app/servicios/conexion.service';
import { SesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.scss']
})
export class AutorComponent implements OnInit {
  
  persona!:Personas;
  listo:boolean=false;
  subscription1!: Subscription;

  constructor(private conexionS:ConexionService, private sesionS:SesionService) { }

  ngOnInit(): void {
    /*this.conexion.getPersona(1).subscribe((resp)=>{
      this.persona=resp;
      this.conexion.persona=resp;
      //this.persona=resp;
      console.log(resp);
      this.listo=true;//Para evitar error al tratar de cargar los componentes que aun no llegaron
    })*/



    //Si esta logeado
    if(localStorage.getItem('refresh_token')){
      this.sesionS.verificarTokenObservable.subscribe(resp=>{
        if(resp=='autor'){
          this.traerAutor();
        }
      });
      this.sesionS.verificarToken('autor');  
    //Si NO esta logueado
    }else{    
      this.traerAutor();
    }


  }

  traerAutor(){
    this.subscription1=this.conexionS.getPersona(1).subscribe((resp)=>{
      this.persona=resp;
      this.conexionS.persona=resp;
      //this.persona=resp;
      console.log(resp);
      this.listo=true;//Para evitar error al tratar de cargar los componentes que aun no llegaron
      this.subscription1.unsubscribe();
    })
  }

}
