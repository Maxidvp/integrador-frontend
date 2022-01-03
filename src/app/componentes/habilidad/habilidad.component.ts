import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styleUrls: ['./habilidad.component.scss']
})
export class HabilidadComponent implements OnInit {

  constructor() { }

  @Input() habilidad:any;

  ngOnInit(): void {
    detectarChildSVG();
  }

}


function detectarChildSVG(){
  let image1=document.getElementById('svg1')!;
  let paths=image1.getElementsByTagName('path');
  for(let i=0; i<paths.length; i++){
    paths[i].addEventListener("mouseenter", function(event){
      let tex=document.getElementById('porcent')!;
      tex.innerHTML=((i*10)+10)+' %';
      for(let j=0; j<paths.length; j++){
        paths[j].style.fill=(j<=i)?'green':'grey';
      }
    }, false);
  }
}