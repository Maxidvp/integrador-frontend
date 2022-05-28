import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PersonaService } from 'src/app/servicios/persona.service';
import { ModalService } from 'src/app/servicios/modal.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  //Guarda los datos a mostrar

  @Input() miportfolio:boolean=false;
  username:any;
  logueado:boolean=false;
  foto:string='assets/imagenes/profile_picture.png';
  private subscription1! : Subscription;
  
  constructor(private modalS:ModalService,private usuarioS:UsuarioService, private router: Router) { }

  ngOnInit(): void {
    //Si se esta logueado se trae la foto de perfil
    if(localStorage.getItem('refresh_token')){
      //Como la verificacion de token se hace en componentes superioes se puede pedir directamente
      this.traerFoto();
    }
    //Escucha cuando se inicia o cierra sesion desde el modal
    this.usuarioS.sesionCabeceraObservable.subscribe(resp=>{
      this.mostrarUsername();
    });
    this.mostrarUsername();
  }
  
  //Habilita la ventana de iniciar sesion o registra segun el parametro
  sesion(seccion:string){
    this.modalS.abrirModal('sesion',seccion);
  }

  //Habilita los botones de logueo correspondientes
  mostrarUsername(){
    if(localStorage.getItem('username')){
      this.traerFoto();
      this.username=localStorage.getItem('username');
      this.logueado=true;
    }
  }

  //Elimina los tokens y cambia los botones de sesion
  desloguear():void{
    this.logueado=false;
    this.usuarioS.desloguear();
  }

  instancia(){
    this.modalS.abrirModal('instancia',true);
  }

  traerFoto(){
    this.subscription1=this.usuarioS.traerFotoPerfil().subscribe((resp)=>{
      ///-//////-///console.log(resp);
      if(resp){
        this.foto=resp;
      }
      this.subscription1.unsubscribe();
    })
  }
  miPortfolio(){
    this.router.navigate(['miportfolio']);
  }
}
