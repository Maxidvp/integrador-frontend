import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConexionService } from 'src/app/servicios/conexion.service';
import { SesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-instancia',
  templateUrl: './instancia.component.html',
  styleUrls: ['./instancia.component.scss']
})
export class InstanciaComponent implements OnInit {

  private subscription1! : Subscription;
  private subscription2! : Subscription;
  @Output() modalEmitter = new EventEmitter<boolean>();
  
  constructor(private conexionS: ConexionService, private sesionS: SesionService, private router: Router) { }

  ngOnInit(): void {
  }
  /*ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }*/

  cerrarModal():void{
    this.modalEmitter.emit(false);
  }

  //False crea vacio | True copia
  instanciar(tipo:number):void{
    this.subscription1=this.sesionS.verificarTokenObservable.subscribe(resp=>{
    console.log('resp1 Sin efecto');
    console.log(resp);
      if(resp=='instancia'){
        this.subscription2=this.conexionS.instanciarPersona(tipo).subscribe(resp=>{
          console.log('resp2');
          console.log(resp);
          //this.conexionS.persona=resp;
          //this.conexionS.getPersona(0).subscribe();
          this.subscription1.unsubscribe();
          this.subscription2.unsubscribe();
          this.router.navigate(['']);
          setTimeout(() => {
            this.router.navigate(['miportfolio']);
          }, 10);
          this.cerrarModal();
        });
      }
    });
    this.sesionS.verificarToken('instancia');
  }
}

