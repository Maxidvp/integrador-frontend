import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { Personas } from 'src/app/interfaz/Personas';
import { PersonaService } from 'src/app/servicios/persona.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-miportfolio',
  templateUrl: './miportfolio.component.html',
  styleUrls: ['./miportfolio.component.scss']
})
export class MiportfolioComponent implements OnInit {

  persona:Personas=this.personaS.persona;
  listo:boolean=false;
  subscription1!:Subscription;
  subscription2!:Subscription;

  constructor(private personaS:PersonaService, private usuarioS:UsuarioService, private router: Router) { }

  ngOnInit(): void {
    //Si esta logeado
    if(localStorage.getItem('refresh_token')){
      this.subscription1=this.usuarioS.verificarTokenObservable.subscribe(resp=>{
        if(resp=='miportfolio'){
          this.subscription2=this.personaS.getPersona(0).subscribe({
            next:v=>{
              this.personaS.persona=v.body;
              this.persona=this.personaS.persona;
              ///-//////-///console.log('miportfolio',v.body);
              this.listo=true;//Para evitar error al tratar de cargar los componentes que aun no llegaron
              this.subscription1.unsubscribe();
              this.subscription2.unsubscribe();
            },
            error:e=>{  
              this.router.navigate(['error']);
            }
          })
        }
      });
      this.usuarioS.verificarToken('miportfolio');  
    //Si NO esta logueado
    }else{    
      this.router.navigate(['']);
    }

    //Por algun motivo no actualiza los cambios asi que lo fuerzo con esto
    this.personaS.personaCambioObservable.subscribe(resp=>{
      ///-//////-///console.log('personaCambioObservable');
      ///-//////-///console.log(resp);
      this.personaS.persona=resp; 
      this.persona=this.personaS.persona;
    });

  }
}
