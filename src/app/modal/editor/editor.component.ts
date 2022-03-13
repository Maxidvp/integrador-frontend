import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Personas } from 'src/app/interfaz/Personas';
import { Red } from 'src/app/interfaz/Redes';
import { ConexionService } from 'src/app/servicios/conexion.service';
import { ModalService } from 'src/app/servicios/modal.service';
import { SesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @Input() datos:any;/*={
    'tipo':'ninguno',
    'id':0,
    'accion':'ninguno'//'editar' 'eliminar' 'agregar'
  };*/
  subscripction!: Subscription;
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
    //this.subscripction = this.modalS.abrirModalEditarObservable.subscribe(datos => {
    //datos->
      //tipo:'ninguno''redes''resumen''educaciones''experiencias''habilidades''proyectos'
      //id:number
      //accion:'editar''agregar''eliminar'
      console.log(this.datos)
      if(this.datos.tipo!='ninguno'){
        if (this.datos.tipo=='redes') {
          this.contenido=this.conexionS.persona.redes;
        }else if(this.datos.tipo=='resumen') {
          this.contenido=this.conexionS.persona;
        }else if(this.datos.accion=='editar' || this.datos.accion=='eliminar'){
          console.log('datos',this.datos);
          this.contenido=(this.conexionS.persona[this.datos.tipo].filter((elem: { id: number; })=>elem.id==this.datos.id))[0];//Obtiene el contenido
        }else if(this.datos.accion=='agregar'){
          console.log('estoy en agregar');
          //alert(datos.tipo);
          this.contenido=this.json[this.datos.tipo as keyof  Personas];//se usa un contendio base para editar this.tipo as keyof  Personas
          //Por la estructura de personas hay que seleccionar el primer elemento de json
          //if(this.contenido instanceof Array){
            this.contenido=this.contenido[0];
          //}
          console.log('this.contenido');
          console.log(this.contenido);
        }          
        this.accion=this.datos.accion;//metodo a aplicar
        this.tipo=this.datos.tipo;//Habilita el componente correspondiente al contenido

      }
    //})
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
    if(this.tipo=='resumen'){
      this.contenido.foto=(<HTMLInputElement>document.getElementById('resFoto')).value;
      this.contenido.nombre=(<HTMLInputElement>document.getElementById('resNombre')).value;
      this.contenido.apellido=(<HTMLInputElement>document.getElementById('resApellido')).value;
      this.contenido.titulo=(<HTMLInputElement>document.getElementById('resTitulo')).value;
      this.contenido.nacimiento=(<HTMLInputElement>document.getElementById('resNacimiento')).value;
      this.contenido.direccion=(<HTMLInputElement>document.getElementById('resDireccion')).value;
      this.contenido.telefono=(<HTMLInputElement>document.getElementById('resTelefono')).value;
      this.contenido.email=(<HTMLInputElement>document.getElementById('resEmail')).value;
      this.contenido.sobremi=(<HTMLInputElement>document.getElementById('resSobremi')).value;
    }else if(this.tipo=='experiencias'){
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

      //Warn: anda una sola vez despues pasan cosas raras

      //Obtengo una node list de los elementos con node list
      //Usar id mejot
      let redes=document.getElementsByClassName('red');
      let temp:Array<Red>=[];

      for (let i = 0; i < redes.length; i++) {
        //para cada elemnto de la nodelist obtengo el valor del imput
        let valor=(<HTMLInputElement>(<HTMLCollection>redes[i].getElementsByTagName('input'))[0]).value;
        //si esta definido lo agrego al vector temp
        if(valor){
          //filtro los objetos de personas.redes en busca del id que tiene la red en la DB
          let id=this.conexionS.persona.redes.filter((red:{red_id: number}) => {return red.red_id==i});
          console.log(id);

          //Agrego un elemento de tipo Redes, si el id no existe no se agrega
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
        //Es necesario guardar personas con los nuevos id si es que existen
        this.conexionS.persona=res;   
        this.subscription1.unsubscribe();
        this.subscription2.unsubscribe();
        this.conexionS.personaCambio(res);
        this.cerrar();     
      });      
    });
    this.sesionS.verificarToken('editorGuardar');
  }

  agregar(){
    console.log('En agregar');
    let temp:any;
    //Agregar solo funciona para el contenido con tipo array por lo que no hace falta comprobacion
    //Se agrega un elemento vacio a personas
    temp=(this.json[this.tipo as keyof  Personas]);
    temp=temp[0];
    let pos=this.conexionS.persona[this.tipo].push(temp);
    //let pos=this.conexionS.persona[this.tipo].push(this.json[this.tipo as keyof  Personas]);
    console.log('En mostrar persona');
    console.log(this.conexionS.persona);
    //Warn:Se puede implementar una tecnica similar para vizualizar los cambios
    //Se cambia el contexto del contenido al nuevo elemento vacio agregado para que guardar lo reescriba
    this.contenido=(this.conexionS.persona[this.tipo])[pos-1];
    this.guardar();
    this.cerrar();
  }
  
  //json con informacion para los placeholders de los formularios o para la estructura de un nuevo elemento
  json:Personas={
    "nombre": "Nombre",
    "apellido": "Apellido",
    "titulo": "Titulo",
    "direccion": "Direccion",
    "telefono": "Telefono",
    "email": "Email",
    "nacimiento": "Nacimiento",
    "foto": "URL de la imagen",
    "banner": "URL del banner",
    "sobremi":"",
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
            "habilidad": "",
            "valor": 100
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
