import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modos',
  templateUrl: './modos.component.html',
  styleUrls: ['./modos.component.scss']
})
export class ModosComponent implements OnInit,AfterViewInit {

  modo:boolean=true;

  constructor() { }
  ngAfterViewInit(): void {
    if(localStorage.getItem('username')){
      //Falso si se tiene el modo claro o si no tiene clase, por default se pone el modo claro
      this.modo=!(document.body.className=='dark');
      document.getElementById('toggleModo')!.classList.add((this.modo)?'claro':'oscuro');
    }
  }

  ngOnInit(): void {
    document.getElementById('toggleModo')!.addEventListener('click',()=>{
      //alert(this.isDay);
      this.modo=!this.modo;
      /*document.getElementById('toggleModoAstros')!.classList.remove(!this.isDay?'sol':'luna');
      document.getElementById('toggleModoAstros')!.classList.add(this.isDay?'sol':'luna');

      document.getElementById('toggleModoCielo')!.classList.remove(!this.isDay?'dia':'noche');
      document.getElementById('toggleModoCielo')!.classList.add(this.isDay?'dia':'noche');
      document.getElementById('toggleModo')!.style.backgroundColor=this.isDay?'#61b9e5':'#004373';*/
      document.getElementById('toggleModo')!.classList.remove(!this.modo?'claro':'oscuro');
      document.getElementById('toggleModo')!.classList.add(this.modo?'claro':'oscuro');
      this.togleModo();
    });


  }

  //Cambia de modo claro a modo oscuro
  togleModo(){
    let clase=(document.body.className=='light')? 'dark':'light';
    document.body.className=clase;
    localStorage.setItem('theme',clase);
  }
}