import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personas } from 'src/app/interfaz/Personas';
import { PersonaService } from 'src/app/servicios/persona.service';
import { ModalService } from 'src/app/servicios/modal.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  @Input() miportfolio:boolean=false;
  @Input() encabezado:any;
  

  username:String='';
  constructor(private modalS:ModalService) { }

  ngOnInit(): void { }

}
