import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConexionService } from 'src/app/servicios/conexion.service';
import { SesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-miportfolio',
  templateUrl: './miportfolio.component.html',
  styleUrls: ['./miportfolio.component.scss']
})
export class MiportfolioComponent implements OnInit {

  persona:any;
  listo:boolean=false;

  constructor(private conexionS:ConexionService, private sesionS:SesionService, private router: Router) { }

  ngOnInit(): void {
    //Si esta logeado
    if(localStorage.getItem('refresh_token')){
      this.sesionS.verificarTokenObservable.subscribe(resp=>{
        if(resp=='miportfolio'){
          this.conexionS.getPersona(0).subscribe((resp)=>{
            console.log('mipofolioLog2');
            this.conexionS.persona=resp;
            this.persona=resp;
            console.log(resp);
            this.listo=true;//Para evitar error al tratar de cargar los componentes que aun no llegaron
            //this.subscription1.unsubscribe();
            //this.subscription2.unsubscribe();
          })
        }
      });
      this.sesionS.verificarToken('miportfolio');  
    //Si NO esta logueado
    }else{    
      this.router.navigate(['']);
    }
  }
}
