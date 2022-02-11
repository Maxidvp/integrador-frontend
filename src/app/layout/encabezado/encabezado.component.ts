import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/servicios/conexion.service';
import { ModalService } from 'src/app/servicios/modal.service';
import { SesionService } from 'src/app/servicios/sesion.service';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  constructor(private conexion:ConexionService,private modal:ModalService,private usuario:SesionService) { }

  //Guarda los datos a mostrar
  encabezado:any;
  username:any;
  ngOnInit(): void {

    //CabiarObtencion de los datos por asincornismo
    this.conexion.getEncabezado().subscribe((resp)=>this.encabezado=resp);
    
    //
    this.usuario.sesionCabeceraObservable.subscribe(resp=>{
      this.logueado=resp;
    });
    if(localStorage.getItem('username')){
      this.username=localStorage.getItem('username');
      this.logueado=true;
    }

  }


  
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
  verUsername(){
    return localStorage.getItem('username');
  }

  //Elimina los tokens y cambia los botones de sesion
  desloguear():void{
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    this.logueado=false;
  }

}
