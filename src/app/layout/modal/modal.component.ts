import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../servicios/modal.service';
import { ConexionService } from '../../servicios/conexion.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(private data: ModalService, private conexion: ConexionService) { }

  subscripcion!: Subscription;
  datos={
    'tipo':'ninguno',
    'id':0,
    'accion':'ninguno'//'editar' 'eliminar'
  };
  modal:boolean=false;
  tipo:string='ninguno';
  accion:any;
  contenido:any;

  ngOnInit(): void {
    //Se ejecuta cuando se clickea algun boton de edicion
    this.subscripcion = this.data.puenteModal.subscribe(datos => {
      if(datos.tipo!='ninguno'){
        this.contenido=(this.conexion.persona[datos.tipo].filter((elem: { id: number; })=>elem.id==datos.id))[0];//Obtiene el contenido
        this.tipo=datos.tipo;//Habilita el componente correspondiente al contenido
        this.modal=true;//Activa el modal
        this.accion=datos.accion;
      }
    })
  }


  eliminar(){
    console.log(this.conexion.persona);
    alert('El elemento se elimino correctamente');
  }

  cancelar(){
    this.modal=false;
    this.tipo='ninguno';
  }

/*
            "id": 1,
            "periodo": "2008-2010",
            "lugar": "Santiago Saenz S.A.",
            "actividades": "Actividades: Tareas de mantenimiento",
            "src": "../../../assets/imagenes/saenz.png"

*/ 


  guardar(){
    if(this.tipo=='experiencias'){
      this.contenido.lugar=(<HTMLInputElement>document.getElementById('expLugar')).value;
      this.contenido.periodo=(<HTMLInputElement>document.getElementById('expPeriodo')).value;
      this.contenido.actividades=(<HTMLInputElement>document.getElementById('expActividades')).value;
      this.contenido.src=(<HTMLInputElement>document.getElementById('expImagen')).value;
    }else if(this.tipo=='educaciones'){
      document.getElementById('eduLugar');
      document.getElementById('eduPeriodo');
      document.getElementById('eduTitulo');
      document.getElementById('eduImagen');
    }else if(this.tipo=='proyecctos'){
      document.getElementById('proTitulo');
      document.getElementById('proImagen');
      document.getElementById('proTitulo');
      document.getElementById('proImagen');
    }
    this.conexion.actualizarDB().subscribe((resp)=>{
      console.log(resp);
    });

  }
}
