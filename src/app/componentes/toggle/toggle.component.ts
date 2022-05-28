import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PersonaService } from 'src/app/servicios/persona.service';
import { ModalService } from 'src/app/servicios/modal.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit,AfterViewInit {

  username:String='';
  path:String=window.location.origin;
  @Input() encabezado:any;
  //@Input() miportfolio:boolean=false;
  private subscription1! : Subscription;
  private subscription2! : Subscription;

  
  constructor(private usuarioS:UsuarioService, private personaS:PersonaService, private modal:ModalService) { }
  ngAfterViewInit(): void {
    if(this.encabezado.publico){
      document.getElementById('switchPublico')!.classList.add("on");
    }/*else{
      document.getElementById('switchPublico')!.classList.remove("on");
    }*/
  }

  ngOnInit(): void {
    this.username=(localStorage.getItem('username')!);
  }

  activarEdicion(){
    this.modal.toggleEdicion();
    let texto=document.getElementById('ususarioActivarEd');
    if(this.modal.activo){
      texto!.innerHTML='Deshabilitar edición';
      document.getElementById('switchEdicion')!.classList.add("on");
    }else{
      texto!.innerHTML='Habilitar edición';
      document.getElementById('switchEdicion')!.classList.remove("on");
    }
  }
  //Cambia de modo claro a modo oscuro
  alerta(){

    let aux:boolean=!(this.encabezado.publico);
    if(aux){
      document.getElementById('switchPublico')!.classList.add("on");
      document.getElementById('hideToggleA')!.classList.remove("toggleOFF");
      this.encabezado.publico=!this.encabezado.publico;
    }else{
      document.getElementById('switchPublico')!.classList.remove("on");
      document.getElementById('hideToggleA')!.classList.add("toggleOFF");
      setTimeout(()=>{
        this.encabezado.publico=!this.encabezado.publico;
      }, 400);
    }

    this.subscription1=this.usuarioS.verificarTokenObservable.subscribe(resp=>{
      this.subscription2=this.personaS.togglePublico(aux).subscribe(res=>{
        ///-//////-///console.log('toggle');
        ///-//////-///console.log(res);
        this.subscription1.unsubscribe();
        this.subscription2.unsubscribe();
      });      
    });
    this.usuarioS.verificarToken('toggle');
  }
}
