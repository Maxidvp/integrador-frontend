import { Component, Input, OnInit } from '@angular/core';
import { Habilidad } from 'src/app/interfaz/Personas';

@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styleUrls: ['./habilidad.component.scss']
})
export class HabilidadComponent implements OnInit {
  
  @Input() habilidad!:Habilidad;
  @Input() mostarIconos: boolean=false;
  @Input() accion: string='ninguno';//'editar''agregar''eliminar'

  constructor() { }

  ngOnInit(): void {
    //console.log(this.habilidad,this.habilidad.id);
    //Activa la rueda interactiva
    if(this.accion=='agregar' || this.accion=='editar'){
      this.detectarChildSVG();
    }
  }

  detectarChildSVG(){
    //Fija el valor con un click
    let image1=document.getElementById('svg1')!;
    image1.addEventListener("click",fijarPorcentaje);
    //image1.addEventListener("mouseenter",pathsVerdes);
    let paths=image1.getElementsByTagName('path');
    //Fija los hovers de los segmentos (paths)
    for(let i=0; i<paths.length; i++){
      paths[i].addEventListener("mouseenter", pathsVerdes ,false);
    }
  }
}
/**function(){
        setPorcentaje(i);
        for(let j=0; j<paths.length; j++){
          paths[j].style.fill=(j<=i)?'green':'grey';
        }
      }
 * 
 */

function pathsVerdes(evt:any) {
  let origin = evt.target.closest("path");
  let paths=origin.parentElement.getElementsByTagName('path');
  let encontrado=false;
  for(let i=0; i<paths.length; i++){
    paths[i].style.fill=(!encontrado)?'green':'grey';
    if (paths[i]==origin) {
      //Seteo el pocentaje
      setPorcentaje(i);
      encontrado=true;
    }
  }
}

function fijarPorcentaje(evt:any){
  pathsVerdes(evt);
  //Obtengo el path que disparo el evento y todos los path de la rueda
  const origin = evt.target.closest("path");
  let image1=document.getElementById('svg1')!;
  let paths=image1.getElementsByTagName('path');
  //Habilito la edicion del texto
  porcentSet=false;
  //Obtengo el indice del path que disparo el evento
  for(let i=0; i<paths.length; i++){
    paths[i].removeEventListener("mouseenter", pathsVerdes);
    if (paths[i]==origin) {
      //Seteo el pocentaje
      setPorcentaje(i);
    }
  }
  porcentSet=true;
}

//porcentSet limita su ejecucion durante los llamados del hover de los paths
let porcentSet:boolean=false;
function setPorcentaje(porcentaje:number){
  if (!porcentSet) {
    let tex=document.getElementById('habilidadPorcent')!;
    let temp:number=((porcentaje*10)+10);
    tex.innerHTML=temp+' %';
    (<HTMLInputElement>document.getElementById('habValor')).value=temp.toString();
  }
}

