import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Personas } from 'src/app/interfaz/Personas';
import { PersonaService } from 'src/app/servicios/persona.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.scss']
})
export class AutorComponent implements OnInit {
  
  persona:Personas=this.personaS.persona;
  listo:boolean=false;
  subscription1!: Subscription;

  constructor(private personaS:PersonaService, private usuarioS:UsuarioService, private router: Router) { }

  ngOnInit(): void {
    /*this.conexion.getPersona(1).subscribe((resp)=>{
      this.persona=resp;
      this.conexion.persona=resp;
      //this.persona=resp;
      ///-//////-///console.log(resp);
      this.listo=true;//Para evitar error al tratar de cargar los componentes que aun no llegaron
    })*/


    //Si esta logeado
    if(localStorage.getItem('refresh_token')){
      this.usuarioS.verificarTokenObservable.subscribe(resp=>{
        if(resp=='autor'){
          this.traerAutor();
        }
      });
      this.usuarioS.verificarToken('autor');  
    //Si NO esta logueado
    }else{    
      this.traerAutor();
    }


  }

  traerAutor(){
    this.subscription1=this.personaS.getPersona(1).subscribe({
      next:(resp)=>{
        this.persona=resp;
        this.personaS.persona=resp;
        //this.persona=resp;
        ///-//////-///console.log('autor',this.personaS.persona);
        this.listo=true;//Para evitar error al tratar de cargar los componentes que aun no llegaron
        this.subscription1.unsubscribe();
      },
      error:(error) => {  
        this.router.navigate(['error']);
      }
    })
  }

}
