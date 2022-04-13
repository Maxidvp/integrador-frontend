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
        //redes y resumen no poseen la misma estructura que los demas componentes por lo que no son procesados
        if (this.datos.tipo=='redes') {
          this.contenido=this.conexionS.persona.redes;
        }else if(this.datos.tipo=='resumen') {
          this.contenido=this.conexionS.persona;
        }else if(this.datos.tipo=='banner') {
            this.contenido=this.conexionS.persona.banner;
        }else if(this.datos.accion=='editar' || this.datos.accion=='eliminar'){
          console.log('datos',this.datos);
          this.contenido=(this.conexionS.persona[this.datos.tipo].filter((elem: { id: number; })=>elem.id==this.datos.id))[0];//Obtiene el contenido
        }else if(this.datos.accion=='agregar'){
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
    if(this.tipo=='banner'){
      this.conexionS.persona.banner=this.modalS.personaModal.banner;
    }else if(this.tipo=='resumen'){
      this.contenido.foto=this.modalS.personaModal.foto;
      this.contenido.nombre=this.modalS.personaModal.nombre;
      this.contenido.apellido=this.modalS.personaModal.apellido;
      this.contenido.titulo=this.modalS.personaModal.titulo;
      this.contenido.nacimiento=this.modalS.personaModal.nacimiento;
      this.contenido.direccion=this.modalS.personaModal.direccion;
      this.contenido.telefono=this.modalS.personaModal.telefono;
      this.contenido.email=this.modalS.personaModal.email;
      this.contenido.sobremi=this.modalS.personaModal.sobremi;
    }else if(this.tipo=='experiencias'){
      /*this.contenido=this.modalS.personaModal.experiencias[0];*/
      this.contenido.lugar=this.modalS.personaModal.experiencias[0].lugar;
      this.contenido.periodo=this.modalS.personaModal.experiencias[0].periodo;
      this.contenido.actividades=this.modalS.personaModal.experiencias[0].actividades;
      this.contenido.src=this.modalS.personaModal.experiencias[0].src;
    }else if(this.tipo=='educaciones'){
     /* this.contenido=this.modalS.personaModal.educaciones[0];*/
      this.contenido.lugar=this.modalS.personaModal.educaciones[0].lugar;
      this.contenido.periodo=this.modalS.personaModal.educaciones[0].periodo;
      this.contenido.titulo=this.modalS.personaModal.educaciones[0].titulo;
      this.contenido.src=this.modalS.personaModal.educaciones[0].src;
    }else if(this.tipo=='proyectos'){
      /*this.contenido=this.modalS.personaModal.proyectos[0];*/
      this.contenido.titulo=this.modalS.personaModal.proyectos[0].titulo;
      this.contenido.periodo=this.modalS.personaModal.proyectos[0].periodo;
      this.contenido.descripcion=this.modalS.personaModal.proyectos[0].descripcion;
      this.contenido.url=this.modalS.personaModal.proyectos[0].url;
      this.contenido.fotos=this.modalS.personaModal.proyectos[0].fotos;
    }else if(this.tipo=='habilidades'){
      this.contenido.habilidad=this.modalS.personaModal.habilidades[0].habilidad;
      this.contenido.valor=(<HTMLInputElement>document.getElementById('habValor')).value;
    }else if(this.tipo=='redes'){
      //Obtengo una node list de los elementos con node list
      //Usar id mejor
      let redes=document.getElementsByClassName('red');
      let temp:Array<Red>=[];

      for (let i = 0; i < redes.length; i++) {
        //para cada elemento de la nodelist obtengo el valor del imput
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
    console.log('Antes de enviar: ',this.conexionS.persona );

    this.subscription1=this.sesionS.verificarTokenObservable.subscribe(resp=>{
      this.subscription2=this.conexionS.actualizarDB().subscribe(res=>{
        console.log('respuesta del actualizar');
        console.log(res);
        //Es necesario guardar personas con los nuevos id si es que existen
        this.conexionS.persona=res;   
        this.subscription1.unsubscribe();
        this.subscription2.unsubscribe();
        //Aviso y envio al componente padre el nuevo contenido
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
    "publico":false,
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
            "periodo": "",
            "descripcion": "",
            "url": "",
            "fotos": ""
          }
        ],
    "redes":[]
  }
}
