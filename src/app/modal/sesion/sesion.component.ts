import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscriber, Subscription, timeout } from 'rxjs';
import { PersonaService } from 'src/app/servicios/persona.service';
import { ModalService } from 'src/app/servicios/modal.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss']
})
export class SesionComponent implements OnInit {

  password:string='';
  username:string='';
  email:string='';
  mostrar:any;//acceder || registrar || ninguno
  @Output() modalEmitter = new EventEmitter<boolean>();
  subscripction! : Subscription;
  subscripction2! : Subscription;

  public regisForm:{
    username:{
      val:string,
      valold:string,
      error:string,
      valido:boolean,
      esValido:()=>boolean
    },    
    email:{
      val:string,
      valold:string,
      error:string,
      valido:boolean,
      esValido:()=>boolean
    },
    password:{
      val:string,
      error:string,
      valido:boolean,
      esValido:()=>boolean
    }
  };
  public accederForm:{
    usermail:{
      val:string,
      error:string,
      esValido:()=>boolean
    },    
    password:{
      val:string,
      error:string,
      esValido:()=>boolean
    }
  };

  constructor(private modalS:ModalService, private usuarioS:UsuarioService) {
    this.regisForm={
      username:{
        val:'',
        valold:'',
        error:'El username no es valido, debe poseer almenos 4 caracteres alfanumericos o guiones',
        valido:false,
        esValido(){
          //Se hace un seguimiento del valor para ingresar solamente cuando cambia y evitar multiples consultas 
          if(this.val!=this.valold){
            //Se evalua el username como almenos 4 caracteres alfanamuericos y guiones
            const patter=/^[a-zA-Z0-9_-]{4,20}$/;
            this.valold=this.val;
            this.valido=patter.test(this.val);

            //Si es valido se consulta en la DB si esta disponible
            let subscription1! : Subscription;
            if(this.valido){
              subscription1=usuarioS.usernameLibre(this.val).subscribe(resp=>{
                ///-//////-///console.log(resp);
                //En caso de que se encuentre un username se responde con un "1" por lo que se comparan strings 
                //de existir el username se ivalida
                if(resp!='0'){
                  ///-//////-///console.log('El username ya existe');
                  this.error=`El username ${this.val} no esta disponible`;
                  this.valido=false;
                }
                subscription1.unsubscribe();
              });
            }else{
              this.error='El username no es valido, debe poseer almenos 4 caracteres alfanumericos o guiones';
            }
          }
          return this.valido;
        }
      },
      email:{
        val:'',
        valold:'',
        error:'El email no es valido',
        valido:false,
        esValido(){
          //Se hace un seguimiento del valor para ingresar solamente cuando cambia y evitar multiples consultas 
          if(this.val!=this.valold){
            //Se evalua el formato del email
            const patter=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            this.valold=this.val;
            this.valido=patter.test(this.val);

            //Si es valido se consulta en la DB si esta disponible
            let subscription1! : Subscription;
            if(this.valido){
              subscription1=usuarioS.emailLibre(this.val).subscribe(resp=>{
                ///-//////-///console.log(resp);
                //En caso de que se encuentre un email se responde con un "1" por lo que se comparan strings 
                //de existir el mail se ivalida
                if(resp!='0'){
                  ///-//////-///console.log('El username ya existe');
                  this.error=`El email ${this.val} no esta disponible`;
                  this.valido=false;
                }
                subscription1.unsubscribe();
              });
            }else{
              if(this.val===''){
                this.error='El email es requerido';
              }else{
                this.error='El email no es valido';
              }
            }
          }
          return this.valido;
        }
      },
      password:{
        val:'',
        error:'La contraseña debe terner almenos 4 caracteres',
        valido:false,
        esValido(){
          const patter=/^[a-zA-Z0-9_\-!@#$%^&*]{4,128}$/;
          this.valido=patter.test(this.val);
          if (!this.valido) {
            this.error='La contraseña debe poseer almenos 4 caracteres alfanumericos o los simbolos _-!@#$%^&*';
          }
          return this.valido;
        }
      }
    }
    this.accederForm={
      usermail:{
        val:'',
        error:'Ingrese un usuario o email valido',
        esValido(){
          return this.val.length>3;
        }
      },    
      password:{
        val:'',
        error:'Ingrese una contraseña valida',
        esValido(){
          return this.val.length>3;
        }
      }
    }
  }

  ngOnInit(): void {

    this.subscripction = this.modalS.abrirModalObservable.subscribe(data=>{
      this.mostrar=data.datos;
    });
  }

  loguear():void{
    let log={'username':this.accederForm.usermail.val,
      'password':this.accederForm.password.val
    };
    ///-//////-///console.log('loguear:');
    ///-//////-///console.log(log);
    this.usuarioS.logear(log).subscribe({
      next:(resp)=>{
        ///-//////-///console.log('resp.status');
        ///-//////-///console.log(resp);
        localStorage.setItem('access_token',resp.body.access_token);
        localStorage.setItem('refresh_token',resp.body.refresh_token);
        try{//Despues del registro se loguea y no existe este elemento
          let mensaje=document.getElementById('sesionAccederMensaje')!
          mensaje.className="";
          mensaje.innerHTML=`Bienvenido ${resp.body.username}`;
        }catch{};
        localStorage.setItem('username',resp.body.username);
        this.usuarioS.sesionCabecera();
        setTimeout(this.cerrarModal.bind(this),1000);
      },
      error:(error) => {         
        if(error.statusText=='OK'){
          let mensaje=document.getElementById('sesionAccederMensaje')!;
          mensaje.innerHTML=`Usuario o contraseña incorrecto`;
          mensaje.className="alerta";
          //if(error.status);
        }else{
          //Error de conexion
        }
        //throw error;   //You can also throw the error to a global error handler
      }
    });
  }

  registrar():void{
    let reg={'username':this.regisForm.username.val,
              'email':this.regisForm.email.val,
              'password':this.regisForm.password.val
    };
    ///-//////-///console.log(reg);
    this.usuarioS.registrar(reg).subscribe((resp)=>{
      ///-//////-///console.log(resp);
      if(resp.roles){
        //De implementar el mantener la sesion iniciada hay que cambiar aca
        let log={'username':this.regisForm.username.val,
          'password':this.regisForm.password.val
        };
        this.usuarioS.logear(log).subscribe((resp)=>{
          localStorage.setItem('access_token',resp.body.access_token);
          localStorage.setItem('refresh_token',resp.body.refresh_token);
          localStorage.setItem('username',resp.body.username);
          this.usuarioS.sesionCabecera();
          this.modalS.abrirModal('instancia',true);
        });
      }
    });
  }

  cerrarModal():void{
    this.modalEmitter.emit(false);
  }

  toggleModal():void{
    this.mostrar=(this.mostrar==='acceder')? 'registrar':'acceder';
    ///-//////-///console.log(this.mostrar);
  }
}


