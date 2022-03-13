import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { Personas } from 'src/app/interfaz/Personas';
import { ConexionService } from 'src/app/servicios/conexion.service';
import { SesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-miportfolio',
  templateUrl: './miportfolio.component.html',
  styleUrls: ['./miportfolio.component.scss']
})
export class MiportfolioComponent implements OnInit {

  persona:Personas=this.conexionS.persona;
  listo:boolean=false;
  subscription1!:Subscription;
  subscription2!:Subscription;

  constructor(private conexionS:ConexionService, private sesionS:SesionService, private router: Router) { }

  ngOnInit(): void {
    //Si esta logeado
    if(localStorage.getItem('refresh_token')){
      this.subscription1=this.sesionS.verificarTokenObservable.subscribe(resp=>{
        if(resp=='miportfolio'){
          this.subscription2=this.conexionS.getPersona(0).subscribe((resp)=>{
            this.conexionS.persona=resp;
            this.persona=this.conexionS.persona;
            console.log('miportfolio',resp);
            this.listo=true;//Para evitar error al tratar de cargar los componentes que aun no llegaron
            this.subscription1.unsubscribe();
            this.subscription2.unsubscribe();
          })
        }
      });
      this.sesionS.verificarToken('miportfolio');  
    //Si NO esta logueado
    }else{    
      this.router.navigate(['']);
    }

    //Por algun motivo no actualiza los cambios asi que lo fuerzo con esto
    this.conexionS.personaCambioObservable.subscribe(resp=>{
      this.persona=this.conexionS.persona;
    });

  }
}
