import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConexionService } from 'src/app/servicios/conexion.service';
import { SesionService } from 'src/app/servicios/sesion.service';

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

  
  constructor(private sesionS:SesionService, private conexionS:ConexionService) { }
  ngAfterViewInit(): void {
    if(this.encabezado.publico){
      document.getElementById('switchPublico')!.classList.add("on");
    }/*else{
      document.getElementById('switchPublico')!.classList.remove("on");
    }*/
  }

  ngOnInit(): void {
    this.username=(localStorage.getItem('username')!).toLowerCase();
  }

  //Cambia de modo claro a modo oscuro
  alerta(){
    /*let clase=(document.body.className=='light')? 'dark':'light';
    document.body.className=clase;
    localStorage.setItem('theme',clase);
    document.getElementById('botonModo')!.innerHTML=(document.body.className=='light')?'Modo oscuro':'Modo claro';*/
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

    this.subscription1=this.sesionS.verificarTokenObservable.subscribe(resp=>{
      this.subscription2=this.conexionS.togglePublico(aux).subscribe(res=>{
        console.log('toggle');
        console.log(res);
        this.subscription1.unsubscribe();
        this.subscription2.unsubscribe();
      });      
    });
    this.sesionS.verificarToken('toggle');
  }
}
