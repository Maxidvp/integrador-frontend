import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscriber, Subscription } from 'rxjs';
import { ConexionService } from 'src/app/servicios/conexion.service';
import { ModalService } from 'src/app/servicios/modal.service';
import { SesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss']
})
export class SesionComponent implements OnInit {

  password:string='';
  username:string='';
  email:string='';
  mostrar:string='iniciar';
  @Output() modalEmitter = new EventEmitter<boolean>();
  log={};
  constructor(private conexion:ConexionService, private modalSesion:ModalService, private usuario:SesionService) {
  }

  loguear():void{
    this.log={'username':this.username,
      'password':this.password
    };
    console.log('loguear:');
    console.log(this.log);
    this.usuario.logear(this.log).subscribe((resp)=>{
      console.log(resp.body);
      localStorage.setItem('access_token',resp.body.access_token);
      localStorage.setItem('refresh_token',resp.body.refresh_token);
      try{
        document.getElementById('sesionAccederMensaje')!.innerHTML=`Bienvenido ${resp.body.username}`;
      }catch{};
      localStorage.setItem('username',resp.body.username);
      this.usuario.sesionCabecera();
      setTimeout(this.cerrarModal.bind(this),1000);
    });
  }

  registrar():void{
    let reg={'username':this.username,
              'password':this.password,
              'name':this.email
    };
    console.log(reg);
    this.usuario.registrar(reg).subscribe((resp)=>{
      console.log(resp);
      if(resp.roles){
        this.log={'username':this.username,
          'password':this.password
        };
        this.loguear();
      }
      /*localStorage.setItem('access_token',resp.body.access_token);
      localStorage.setItem('refresh_token',resp.body.refresh_token);
      document.getElementById('sesionAccederMensaje')!.innerHTML=`Bienvenido ${resp.body.username}`;
      localStorage.setItem('username',resp.body.username);
      this.usuario.sesionCabecera();
      setTimeout(this.cerrarModal.bind(this),1000);*/
    });
  }

  cerrarModal():void{
    this.modalEmitter.emit(false);
  }

  toggleModal():void{
    this.mostrar=(this.mostrar==='acceder')? 'registrar':'acceder';
    console.log(this.mostrar);
  }
  
  subscripcion!:Subscription;
  ngOnInit(): void {
    this.subscripcion = this.modalSesion.abrirModalSesionObservable.subscribe(data=>{
      //alert('estoy');
      if (data!='ninguno') {
        this.mostrar=data;
      }
    });
  }

}
