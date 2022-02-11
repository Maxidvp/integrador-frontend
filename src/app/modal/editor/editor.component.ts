import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Personas } from 'src/app/Personas';
import { ConexionService } from 'src/app/servicios/conexion.service';
import { ModalService } from 'src/app/servicios/modal.service';
import { SesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  datos={
    'tipo':'ninguno',
    'id':0,
    'accion':'ninguno'//'editar' 'eliminar' 'agregar'
  };
  subscripcion!: Subscription;
  modal:boolean=false;
  tipo:string='ninguno';
  accion:any;
  contenido:any;
  modalMensaje:string='';
  @Output() modalEmitter = new EventEmitter<boolean>();



  constructor(private data: ModalService, private conexion: ConexionService, private sesion: SesionService) { }

  ngOnInit(): void {
    //Se ejecuta cuando se clickea algun boton de edicion
    this.subscripcion = this.data.abrirModalEditarObservable.subscribe(datos => {
      if(datos.tipo!='ninguno'){
        if(datos.accion=='editar' || datos.accion=='eliminar'){
          this.contenido=(this.conexion.persona[datos.tipo].filter((elem: { id: number; })=>elem.id==datos.id))[0];//Obtiene el contenido
        }else if(datos.accion=='crear'){
          //alert(datos.tipo);
          this.contenido=this.json[datos.tipo as keyof  Personas];//se usa un contendio base para editar this.tipo as keyof  Personas
        }          
        this.accion=datos.accion;//metodo a aplicar
        this.tipo=datos.tipo;//Habilita el componente correspondiente al contenido

      }
    })
  }

  
  eliminar(){
    this.conexion.persona[this.tipo] = this.conexion.persona[this.tipo].filter((obj: { id: number }) => obj.id != this.contenido.id);
    this.conexion.actualizarDB().subscribe((resp)=>{
      console.log(resp);
      this.modalMensaje='El elemento se elimino correctamente';
      setTimeout(this.cerrar.bind(this),1000);
    });
  }


  cerrar(){
    
    this.modalEmitter.emit(false);
    //this.modal=false;
    this.tipo='ninguno';
    this.modalMensaje='';
  }

  guardar(){
    if(this.tipo=='experiencias'){
      this.contenido.lugar=(<HTMLInputElement>document.getElementById('expLugar')).value;
      this.contenido.periodo=(<HTMLInputElement>document.getElementById('expPeriodo')).value;
      this.contenido.actividades=(<HTMLInputElement>document.getElementById('expActividades')).value;
      this.contenido.src=(<HTMLInputElement>document.getElementById('expImagen')).value;
    }else if(this.tipo=='educaciones'){
      this.contenido.lugar=(<HTMLInputElement>document.getElementById('eduLugar')).value;
      this.contenido.periodo=(<HTMLInputElement>document.getElementById('eduPeriodo')).value;
      this.contenido.titulo=(<HTMLInputElement>document.getElementById('eduTitulo')).value;
      this.contenido.src=(<HTMLInputElement>document.getElementById('eduImagen')).value;
    }else if(this.tipo=='proyectos'){
      this.contenido.titulo=(<HTMLInputElement>document.getElementById('proTitulo')).value;
      this.contenido.inicio=(<HTMLInputElement>document.getElementById('proInicio')).value;
      this.contenido.fin=(<HTMLInputElement>document.getElementById('proFin')).value;
      this.contenido.descripcion=(<HTMLInputElement>document.getElementById('proDescripcion')).value;
      this.contenido.url=(<HTMLInputElement>document.getElementById('proReferencia')).value;
      this.contenido.fotos=(<HTMLInputElement>document.getElementById('proImagen')).value;
    }else if(this.tipo=='habilidades'){
      this.contenido.habilidad=(<HTMLInputElement>document.getElementById('habHabilidad')).value;
      this.contenido.valor=(<HTMLInputElement>document.getElementById('habValor')).value;
    }
    this.conexion.actualizarDB().subscribe((resp)=>{//Guarda los cambios en la DB
      if(resp.error_message !== undefined && resp.error_message.match('The Token has expired')){
        this.refreshToken();
      }else{
        this.cerrar();
      }
    });
  }

  crear(){
    let pos=this.conexion.persona[this.tipo].push(this.json[this.tipo as keyof  Personas]);
    this.contenido=(this.conexion.persona[this.tipo])[pos-1];
    this.guardar();
    this.cerrar();
  }

  refreshToken(){
    this.sesion.actualizarToken().subscribe(resp=>{
      
      console.log('Refresh:');
      console.log(resp.access_token);
      localStorage.setItem('access_token',resp.access_token);
      this.guardar();
    });
  }
  
  json:Personas={
    "nombre": "Nombre",
    "apellido": "Apellido",
    "direccion": "Direccion",
    "telefono": "Telefono",
    "email": "Email",
    "edad": "Edad",
    "src": "URL de la imagen",
    "educaciones": 
        {
            "periodo": "",
            "lugar": "",
            "titulo": "",
            "src": ""
        },
    "experiencias": 
        {
            "periodo": "",
            "lugar": "",
            "actividades": "",
            "src": ""
        },
    "habilidades": 
        {
            "habilidad": "Agregar Habilidad",
            "valor": 0
        },
    "proyectos": 
        {
            "titulo": "",
            "inicio": "",
            "fin": "Fin",
            "descripcion": "",
            "url": "",
            "fotos": ""
        }
  }

}
