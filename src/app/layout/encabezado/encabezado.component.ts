import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personas } from 'src/app/interfaz/Personas';
import { ConexionService } from 'src/app/servicios/conexion.service';
import { ModalService } from 'src/app/servicios/modal.service';
import { SesionService } from 'src/app/servicios/sesion.service';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  @Input() encabezado:any;
  @Input() miportfolio:boolean=false;

  username:any;
  activo:boolean=false;
  constructor(private modalS:ModalService) { }

  ngOnInit(): void {
    //Si se pide que se muestren los elementos de edicion
    this.modalS.toggleEdicionObservable.subscribe(datos => {
      this.activo=datos;
    })
  }

/*
  
  //Activa los botones de edicion
  activarEdicion(){
    this.modal.toggleEdicion();
  }

  //Cambia de modo claro a modo oscuro
  togleModo(){
    document.body.className =(document.body.className=='light')? 'dark':'light';
    document.getElementById('botonModo')!.innerHTML=(document.body.className=='light')?'Modo oscuro':'Modo claro';
  }
  
  //Habilita la ventana de iniciar sesion o registra segun el parametro
  sesion(tipo:string){
    this.modal.abrirModalSesion(tipo);
  }

  //Habilita los botones de logueo correspondientes
  logueado:boolean=false;
  mostrarUsername(){
    if(localStorage.getItem('username')){
      this.username=localStorage.getItem('username');
      this.logueado=true;
    }
  }

  //Elimina los tokens y cambia los botones de sesion
  desloguear():void{
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    this.logueado=false;
    this.router.navigate(['']);
  }

  instancia(){
    this.modal.abrirModalInstancia(true);
  }*/

  /*traerPersona(id:number){
    this.conexion.getPersona(id).subscribe(resp =>{
      //Si no se tiene respuesta
      if(resp===null){
        alert('Algo salio mal');//Mostrar mensaje de error y restaurar el json
      //Si el token expiro
      }else if(resp.error_message !== undefined && resp.error_message.match('The Token has expired')){
        //Subscripction para luego de que se obtuvo el nuevo token
        this.SesionS.refreshTokenObservable.subscribe(resp=>{
            //Si se tiene el token nuevo se vuelve a ejecutar la funcion
            if(resp=='encabezado'){
              this.traerPersona(id);
            }else{
              //En caso de error en refresh token
            }
          }
        );
        //Ejecuto el refesh token despues de sescribirme
        this.SesionS.refreshToken('encabezado');
      //Si se realizo correctamente
      }else{
        console.log(resp);
        this.conexion.conexionEncabezadoComponents(resp);
      }
    } );
  }*/
}
