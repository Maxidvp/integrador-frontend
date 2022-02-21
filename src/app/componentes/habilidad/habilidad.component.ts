import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styleUrls: ['./habilidad.component.scss']
})
export class HabilidadComponent implements OnInit {
  
  @Input() habilidad:any;
  @Input() mostarIconos: any;
  @Input() accion: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.habilidad);
    this.detectarChildSVG();
  }

  detectarChildSVG(){
    if(this.accion=='editar' || this.accion=='agregar'){
      let image1=document.getElementById('svg1')!;
      image1.addEventListener("click",fijarPorcentaje);
      let paths=image1.getElementsByTagName('path');
      for(let i=0; i<paths.length; i++){
        paths[i].addEventListener("mouseenter", function(event){
          setPorcentaje(i);
          for(let j=0; j<paths.length; j++){
            paths[j].style.fill=(j<=i)?'green':'grey';
          }
        }, false);
      }
    }
  }
}

function fijarPorcentaje(evt:any){
  const origin = evt.target.closest("path");
  let image1=document.getElementById('svg1')!;
  let paths=image1.getElementsByTagName('path');
  porcentSet=false
  for(let i=0; i<paths.length; i++){
    if (paths[i]==origin) {
      setPorcentaje(i);
    }
  }
  porcentSet=true;
}

let porcentSet:boolean=false;
function setPorcentaje(porcentaje:number){
  if (!porcentSet) {
    let tex=document.getElementById('habilidadPorcent')!;
    let temp:number=((porcentaje*10)+10);
    tex.innerHTML=temp+' %';
    (<HTMLInputElement>document.getElementById('habValor')).value=temp.toString();
  }
}

