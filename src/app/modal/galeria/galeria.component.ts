import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {
  //['assets/galeria/image1.png','assets/galeria/image2.png','assets/galeria/image3.png','assets/galeria/image4.png'];
  @Input() galeria:Array<String>=[''];
  imagen:String='';
  index:number=0;
  @Output() modalEmitter = new EventEmitter<boolean>();

  //Swipe comand
  touchstartX = 0;
  touchstartY = 0;
  touchendX = 0;
  touchendY = 0;
  
  constructor() { }

  ngOnInit(): void {
    this.imagen=this.galeria[0];

    //Swipe comand
    const gestureZone = document.querySelector('.imgContainer')!;

    if('ontouchstart' in gestureZone){
      gestureZone.addEventListener('touchstart', (event) => {
        this.touchstartX = (<TouchEvent>event).changedTouches[0].screenX;
        this.touchstartY = (<TouchEvent>event).changedTouches[0].screenY;
      }, false);

      gestureZone.addEventListener('touchend', (event) => {
        this.touchendX = (<TouchEvent>event).changedTouches[0].screenX;
        this.touchendY = (<TouchEvent>event).changedTouches[0].screenY;
        this.handleGesture();
      }, false); 
    }else{
      gestureZone.addEventListener('mousedown', (event) => {
        this.touchstartX = (<MouseEvent>event).screenX;
        this.touchstartY = (<MouseEvent>event).screenY;
      }, false);

      gestureZone.addEventListener('mouseup', (event) => {
        this.touchendX = (<MouseEvent>event).screenX;
        this.touchendY = (<MouseEvent>event).screenY;
        this.handleGesture();
      }, false); 
    }


   
  }

  handleGesture() {
    if (this.touchendX <= this.touchstartX) {
      ///-//////-///console.log('Swiped left');
      this.siguiente();
    }
    
    if (this.touchendX >= this.touchstartX) {
        ///-//////-///console.log('Swiped right');
        this.anterior();
    }
    
    if (this.touchendY <= this.touchstartY) {
        ///-//////-///console.log('Swiped up');
    }
    
    if (this.touchendY >= this.touchstartY) {
        ///-//////-///console.log('Swiped down');
    }
    
    if (this.touchendX === this.touchstartX) {
        ///-//////-///console.log('Tap',this.touchendX,window.screen.width/2);
        if(this.touchendX>(window.screen.width/2)){
          this.siguiente()
        }else{
          this.anterior()
        }
    }
  }
  cambiarFoto(evt:any) {
    let origin = evt.target.closest("div");
    //En caso de que el click se realice en el div de relleno
    if(origin.className!='circulo'){
      origin=origin.parentElement;
    }
    //En caso de que el click se realice en el div contenedor
    if(origin.className=='circulo'){
      let hermanos = origin.parentElement.childNodes;
      for (let i = 0; i < hermanos.length; i++) {
        if(hermanos[i]===origin){
          this.index=i;
          this.imagen=this.galeria[i];
          return
        }
      }      
    }

  }
  anterior(){
    this.index=(this.index==0)?this.galeria.length-1:--this.index;
    ///-//////-///console.log(this.index);
    this.imagen=this.galeria[this.index];
  }
  siguiente(){
    this.index=(this.index==this.galeria.length-1)?0:++this.index;
    this.imagen=this.galeria[this.index];
  }

  cerrarModal():void{
    this.modalEmitter.emit(false);
  }

  toggleOpacity(){
    ///-//////-///console.log('this.galeria.length-1,this.index');
    let clase=document.getElementById('fadeContainer')!.className;
    let nuevaClase=(clase=='ocultar')?'mostrar':'ocultar';

    document.getElementById('fadeContainer')!.className=nuevaClase;
    document.getElementById('galeriaCirculos')!.className=nuevaClase;
  }
}
