import { Component, Input, OnInit } from '@angular/core';
import { Habilidad } from 'src/app/interfaz/Personas';
import { ModalService } from 'src/app/servicios/modal.service';

@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styleUrls: ['./habilidad.component.scss']
})

export class HabilidadComponent implements OnInit {
  
  @Input() habilidad!:Habilidad;
  @Input() mostarIconos: boolean=false;
  @Input() accion: string='ninguno';//'editar''agregar''eliminar'

  constructor(public modalS:ModalService) { }

  ngOnInit(): void {
    //Activa la rueda interactiva y setea los valores iniciiales del formulario
    if(this.accion=='agregar' || this.accion=='editar'){
      this.modalS.personaModal.habilidades[0].habilidad=this.habilidad.habilidad;
      this.detectarChildSVG();
    }
    //Permite la animacion en el hover al cargar nuevos componentes
    porcentSet=false;
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
    document.getElementById('svg1')!.addEventListener("mouseleave", restaurar ,false);
    valorOriginal=this.habilidad.valor;
  }
}
//porcentSet limita su ejecucion durante los llamados del hover de los paths
let porcentSet:boolean=false;
let valorOriginal:Number;

function pathsVerdes(evt:any) {
  let origin = evt.target.closest("path");
  let paths=origin.parentElement.getElementsByTagName('path');
  let encontrado=false;
  for(let i=0; i<paths.length; i++){
    paths[i].style.fill=(!encontrado)?'green':'grey';
    if (paths[i]==origin) {
      //Seteo el pocentaje
      mostrarPorcentaje(i);
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
      mostrarPorcentaje(i);
      (<HTMLInputElement>document.getElementById('habValor')).value=((i*10)+10).toString();
    }
  }
  porcentSet=true;
}


function mostrarPorcentaje(porcentaje:number){
  if (!porcentSet) {
    let tex=document.getElementById('habilidadPorcent')!;
    let temp:number=((porcentaje*10)+10);
    tex.innerHTML=temp+'%';
    //(<HTMLInputElement>document.getElementById('habValor')).value=temp.toString();
  }
}

function restaurar() {
  if (!porcentSet) {
    //Restaura el valor
    document.getElementById('habilidadPorcent')!.innerHTML=valorOriginal+'%';
    //Restauro los segmentos
    let origin=document.getElementById('svg1')!;
    let paths=origin.getElementsByTagName('path');
    for(let i=0; i<paths.length; i++){
      paths[i].style.fill=( i<( Number(valorOriginal)/10) )?'green':'grey';
    }
    //Como se usa un input hidden para guardar el valor se debe sobre escribir el valor default
    (<HTMLInputElement>document.getElementById('habValor')).value=valorOriginal+'';
  }
}

