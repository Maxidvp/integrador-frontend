import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Personas } from 'src/app/interfaz/Personas';
import { ModalService } from 'src/app/servicios/modal.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  
  @Input() persona!:Personas;
  @Input() listo:boolean=false;
  @Input() miportfolio:boolean=false;
  activo:boolean=false;

  constructor(private modalS:ModalService) { }

  ngOnInit(): void { 
    
    //Si se pide que se muestren los elementos de edicion
    this.modalS.toggleEdicionObservable.subscribe(datos => {
      this.activo=datos;
    })

  }
}
