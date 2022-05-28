import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PersonaService } from 'src/app/servicios/persona.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-instancia',
  templateUrl: './instancia.component.html',
  styleUrls: ['./instancia.component.scss']
})
export class InstanciaComponent implements OnInit {

  private subscription1! : Subscription;
  private subscription2! : Subscription;
  @Output() modalEmitter = new EventEmitter<boolean>();
  
  constructor(private personaS: PersonaService, private usuarioS: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  cerrarModal():void{
    this.modalEmitter.emit(false);
  }

  //False crea vacio | True copia
  instanciar(seccion:number):void{
    this.subscription1=this.usuarioS.verificarTokenObservable.subscribe(res=>{
    ///-//////-///console.log('resp1 Sin efecto');
    ///-//////-///console.log(res);
      if(res=='instancia'){
        this.subscription2=this.personaS.instanciarPersona(seccion).subscribe(resp=>{
          ///-//////-///console.log('resp2');
          ///-//////-///console.log(resp);
          this.subscription1.unsubscribe();
          this.subscription2.unsubscribe();
          //this.router.navigate(['']);
          this.personaS.personaCambio(resp);
          this.router.navigate(['miportfolio']);
          this.cerrarModal();
        });
      }
    });
    this.usuarioS.verificarToken('instancia');
  }
}

