import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Personas } from 'src/app/interfaz/Personas';
import { Redes } from 'src/app/interfaz/Redes';
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
  private subscription1! : Subscription;
  private subscription2! : Subscription;

  constructor(private modalS: ModalService, private conexionS: ConexionService, private sesionS: SesionService) { }

  ngOnInit(): void {
    //Se ejecuta cuando se clickea algun boton de edicion
    this.subscripcion = this.modalS.abrirModalEditarObservable.subscribe(datos => {

      if(datos.tipo!='ninguno'){
        if (datos.tipo=='redes') {
          this.contenido=this.conexionS.persona.redes;
        }else if(datos.tipo=='resumen') {
          this.contenido=this.conexionS.persona;
        }else if(datos.accion=='editar' || datos.accion=='eliminar'){
          this.contenido=(this.conexionS.persona[datos.tipo].filter((elem: { id: number; })=>elem.id==datos.id))[0];//Obtiene el contenido
        }else if(datos.accion=='agregar'){
          console.log('estoy en agregar');
          //alert(datos.tipo);
          this.contenido=this.json[datos.tipo as keyof  Personas];//se usa un contendio base para editar this.tipo as keyof  Personas
          console.log(this.contenido);
        }          
        this.accion=datos.accion;//metodo a aplicar
        this.tipo=datos.tipo;//Habilita el componente correspondiente al contenido

      }
    })
  }

  
  eliminar(){
    this.conexionS.persona[this.tipo] = this.conexionS.persona[this.tipo].filter((obj: { id: number }) => obj.id != this.contenido.id);
    this.conexionS.actualizarDB().subscribe((resp)=>{
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
      this.contenido.periodo=(<HTMLInputElement>document.getElementById('proPeriodo')).value;
      this.contenido.descripcion=(<HTMLInputElement>document.getElementById('proDescripcion')).value;
      this.contenido.url=(<HTMLInputElement>document.getElementById('proReferencia')).value;
      this.contenido.fotos=(<HTMLInputElement>document.getElementById('proImagen')).value;
    }else if(this.tipo=='habilidades'){
      this.contenido.habilidad=(<HTMLInputElement>document.getElementById('habHabilidad')).value;
      this.contenido.valor=(<HTMLInputElement>document.getElementById('habValor')).value;
    }else if(this.tipo=='redes'){
      //Obtengo una node list de los elementos con node list
      //Usar id mejot
      let redes=document.getElementsByClassName('red');
      let temp:Array<Redes>=[];

      for (let i = 0; i < redes.length; i++) {
        //para cada elemnto de la nodelist obtengo el valor del imput
        let valor=(<HTMLInputElement>(<HTMLCollection>redes[i].getElementsByTagName('input'))[0]).value;
        //si esta definido lo agrego al vector temp
        if(valor){
          //filtro los objetos de personas.redes en busca del id que tiene la red en la DB
          let id=this.conexionS.persona.redes.filter((red:{red_id: number}) => {return red.red_id==i});
          console.log(id);

          //Agrego un elemento de tipo Redes, si el id no existe no se agrega
          /*if(id[0]){
            temp.push({ id: id[0].id,
                        red_id: i,
                        username: valor})
          }else{
            temp.push({ red_id: i,
                        username: valor})
          }*/
          temp.push({ id: (id[0])? id[0].id:null,
                      red_id: i,
                      username: valor});
        }
      }
      console.log(temp);
      this.conexionS.persona.redes=temp;
    }

    this.subscription1=this.sesionS.verificarTokenObservable.subscribe(resp=>{
      this.subscription2=this.conexionS.actualizarDB().subscribe(res=>{
        console.log('respuesta del actualizar');
        console.log(res);
        //Es necesario guardar personas con los nuevos id si es que ecsiten
        this.conexionS.persona=res;
        this.cerrar();        
        this.subscription1.unsubscribe();
        this.subscription2.unsubscribe();
      });      
    });
    this.sesionS.verificarToken('editorGuardar');


    //this.sesionS.verificarToken('editor');
/*
    this.conexionS.actualizarDB().subscribe((resp)=>{//Guarda los cambios en la DB
      //null cuando no tiene los permisos para la accion
      if(resp===null){
        alert('No se como hiciste pero te voy a encontrar y te voy a doxear');//Mostrar mensaje de error y restaurar el json
      }else if(resp.error_message !== undefined && resp.error_message.match('The Token has expired')){
        this.sesionS.refreshTokenObservable.subscribe(resp=>{
            if(resp=='editor'){
              this.guardar();
            }else{
              //En caso de error en refresh token
            }
          }
        );
        this.sesionS.refreshToken('editor');
      }else{
        this.cerrar();
      }
    });*/
  }

  agregar(){
    let pos=this.conexionS.persona[this.tipo].push(this.json[this.tipo as keyof  Personas]);
    this.contenido=(this.conexionS.persona[this.tipo])[pos-1];
    this.guardar();
    this.cerrar();
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
        [
          {
            "periodo": "",
            "lugar": "",
            "titulo": "",
            "src": ""
          }
        ],
    "experiencias": 
        [
          {
            "periodo": "",
            "lugar": "",
            "actividades": "",
            "src": ""
          }
        ],
    "habilidades": 
        [
          {
            "habilidad": "Agregar Habilidad",
            "valor": 0
          }
        ],
    "proyectos": 
        [
          {
            "titulo": "",
            "periodo": "Periodo",
            "descripcion": "",
            "url": "",
            "fotos": ""
          }
        ],
    "redes":[]
  }
}
