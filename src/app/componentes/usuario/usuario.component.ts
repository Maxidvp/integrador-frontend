import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConexionService } from 'src/app/servicios/conexion.service';
import { ModalService } from 'src/app/servicios/modal.service';
import { SesionService } from 'src/app/servicios/sesion.service';

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
  
  constructor(private conexion:ConexionService,private modal:ModalService,private SesionS:SesionService, private router: Router) { }

  ngOnInit(): void {
    //Si se esta logueado se trae la foto de perfil
    if(localStorage.getItem('refresh_token')){
      //Como la verificacion de token se hace en componentes superioes se puede pedir directamente
      this.traerFoto();
    }
    //Escucha cuando se inicia o cierra sesion desde el modal
    this.SesionS.sesionCabeceraObservable.subscribe(resp=>{
      this.mostrarUsername();
    });
    this.mostrarUsername();
    /*setTimeout(()=>{
      if(this.logueado){
        document.getElementById('botonModo')!.innerHTML=(document.body.className=='light')?'Modo oscuro':'Modo claro';
      }
    },100)*/
  }

  
  //Activa los botones de edicion
  activarEdicion(){
    this.modal.toggleEdicion();
    let texto=document.getElementById('ususarioActivarEd');
    if(this.modal.activo){
      texto!.innerHTML='Deshabilitar edición';
    }else{
      texto!.innerHTML='Habilitar edición';
    }
  }
/*
  //Cambia de modo claro a modo oscuro
  togleModo(){
    let clase=(document.body.className=='light')? 'dark':'light';
    document.body.className=clase;
    localStorage.setItem('theme',clase);
    document.getElementById('botonModo')!.innerHTML=(document.body.className=='light')?'Modo oscuro':'Modo claro';
  }*/
  
  //Habilita la ventana de iniciar sesion o registra segun el parametro
  sesion(tipo:string){
    this.modal.abrirModalSesion(tipo);
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
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    localStorage.removeItem('theme');
    this.logueado=false;
    this.router.navigate(['']);
    //Para que cargue el light mode
    location.reload();
  }

  instancia(){
    this.modal.abrirModalInstancia(true);
  }

  traerFoto(){
    this.subscription1=this.SesionS.traerFotoPerfil().subscribe((resp)=>{
      console.log(resp);
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
