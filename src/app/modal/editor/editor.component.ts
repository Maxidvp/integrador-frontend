import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Personas, Proyecto } from 'src/app/interfaz/Personas';
import { Red } from 'src/app/interfaz/Redes';
import { PersonaService } from 'src/app/servicios/persona.service';
import { ModalService } from 'src/app/servicios/modal.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @Input() datos:any;
  /*datos={
    'seccion':'ninguno',
    'id':0,
    'accion':'ninguno'//'editar' 'eliminar' 'agregar'
  };*/
  //seccion:'ninguno''redes''resumen''educaciones''experiencias''habilidades''proyectos'
  //id:number
  //accion:'editar''agregar''eliminar'
  subscripction!: Subscription;
  modal:boolean=false;
  seccion:string='ninguno';
  accion:any;
  contenido:any;
  modalMensaje:string='';
  @Output() modalEmitter = new EventEmitter<boolean>();
  private subscription1! : Subscription;
  private subscription2! : Subscription;

  constructor(private modalS: ModalService, private personaS: PersonaService, private usuarioS: UsuarioService) { }

  ngOnInit(): void {
    //Se ejecuta cuando se clickea algun boton de edicion
    ///-//////-///console.log('modal>editor - ngOnInit');
    if(this.datos.seccion!='ninguno'){
      //redes, resumen y banner no poseen la misma estructura que los demas componentes por lo que no son procesados
      if (this.datos.seccion=='redes') {
        //Con el spreed no funciona .-.
        this.contenido=this.personaS.persona.redes;
      }else if(this.datos.seccion=='resumen') {
        this.contenido={...this.personaS.persona.resumen};
      }else if(this.datos.seccion=='banner') {
          this.contenido=this.personaS.persona.resumen.banner;
      }else if(this.datos.accion=='editar' || this.datos.accion=='eliminar'){
        //Para editar o eliminar tomo el contenido existente
        this.contenido={...(this.personaS.persona[this.datos.seccion].filter((elem: { id: number; })=>elem.id==this.datos.id))[0]};
      }else if(this.datos.accion=='agregar'){
        //se usa una plantilla vacia como contenido base para agregar
        let temp:any=this.json[this.datos.seccion as keyof Personas];
        //Por la estructura de personas hay que seleccionar el primer elemento de json
        this.contenido={...temp[0]};
        ///-//////-///console.log('contenido',this.contenido);
      }          
      this.accion=this.datos.accion;//metodo a aplicar
      this.seccion=this.datos.seccion;//Habilita el componente correspondiente al contenido

      ///-//////-///console.log('datos',this.datos,this.contenido);
    }
  }

  paqueteAEnviar():Personas{
    let jsonAEnviar:Personas={
      publico:false,
      resumen: {
        nombre: "",
        apellido: "",
        titulo: "",
        direccion: "",
        telefono: "",
        email: "",
        nacimiento: "",
        foto: "",
        banner: "",
        sobremi: "",
      },
      educaciones: [],
      experiencias: [],
      habilidades: [],
      proyectos: [],
      redes:[]
    }
    let conID=(this.datos.accion=='editar');
    if(this.seccion=='banner'){
      jsonAEnviar.resumen.banner=this.modalS.personaModal.resumen.banner;
    }else if(this.seccion=='resumen'){
      jsonAEnviar.resumen=this.modalS.personaModal.resumen;
    }else if(this.seccion=='experiencias'){
      jsonAEnviar.experiencias.push(this.modalS.personaModal.experiencias[0]);
      jsonAEnviar.experiencias[0].imagen=this.modalS.filtrarUrl(jsonAEnviar.experiencias[0].imagen);
      jsonAEnviar.experiencias[0].id=conID?this.datos.id:null;
    }else if(this.seccion=='educaciones'){
      jsonAEnviar.educaciones.push(this.modalS.personaModal.educaciones[0]);
      jsonAEnviar.educaciones[0].imagen=this.modalS.filtrarUrl(jsonAEnviar.educaciones[0].imagen);
      jsonAEnviar.educaciones[0].id=conID?this.datos.id:null;
    }else if(this.seccion=='habilidades'){
      jsonAEnviar.habilidades.push(this.modalS.personaModal.habilidades[0]);
      //ngModel no toma el valor de la habilidad por estar en un inputhiden
      jsonAEnviar.habilidades[0].valor=Number((<HTMLInputElement>document.getElementById('habValor')).value);
      jsonAEnviar.habilidades[0].id=conID?this.datos.id:null;
    }else if(this.seccion=='proyectos'){
      jsonAEnviar.proyectos.push({...this.modalS.personaModal.proyectos[0]});
      jsonAEnviar.proyectos[0].id=conID?this.datos.id:null;
    }else if(this.seccion=='redes'){
      //Obtengo una node list de los elementos
      //Usar id mejor
      let redes=document.getElementsByClassName('redesInputs');
      let temp:Array<Red>=[];

      for (let i = 0; i < redes.length; i++) {
        //para cada elemento de la nodelist obtengo el valor del imput
        let valor=(<HTMLInputElement>(<HTMLCollection>redes[i].getElementsByTagName('input'))[0]).value;
        //si esta definido lo agrego al vector temp
        if(valor){
          //filtro los objetos de personas.redes en busca del id que tiene la red en la DB
          let id=this.personaS.persona.redes.filter((red:{red_id: number}) => {return red.red_id==i});
          ///-//////-///console.log(id);
          //Agrego un elemento de seccion Redes, si el id no existe no se agrega
          temp.push({ id: (id[0])? id[0].id:null,
                      red_id: i,
                      username: valor});
        }
      }
      ///-//////-///console.log(temp);
      jsonAEnviar.redes=temp;
    }
    ///-//////-///console.log('jsonAEnviar',jsonAEnviar);
    return jsonAEnviar;
  }

  agregar(){
    ///-//////-///console.log('modal>editor - agregar');
    this.modalMensaje='Guardando, por favor espere...';
    this.subscription1=this.usuarioS.verificarTokenObservable.subscribe(resp=>{
      ///-//////-///console.log('se verifica el ususario');
      if(resp=='editorAgregar'){
        //Envio la seccion y el id del elemento a eliminar
        this.subscription2=this.personaS.agregarDB(this.datos.seccion, this.paqueteAEnviar()).subscribe((res)=>{
          ///-//////-///console.log('en el eliminar');
          //this.personaS.persona=res;   
          this.subscription1.unsubscribe();
          this.subscription2.unsubscribe();
          //Aviso y envio al componente padre el nuevo contenido
          this.personaS.personaCambio(res);
          this.modalMensaje='El elemento se agregó correctamente';
          setTimeout(this.cerrar.bind(this),1000);
        });         
      }
    });
    this.usuarioS.verificarToken('editorAgregar');
  }

  editar(){
    ///-//////-///console.log('modal>editor - editar');
    this.modalMensaje='Guardando, por favor espere...';
    this.subscription1=this.usuarioS.verificarTokenObservable.subscribe(resp=>{
      ///-//////-///console.log('modal>editor - editar - Se verifica el ususario');
      if(resp=='editorEditar'){
        //Envio la seccion y el id del elemento a eliminar
        this.subscription2=this.personaS.editarDB(this.datos.seccion, this.paqueteAEnviar()).subscribe((res)=>{
          ///-//////-///console.log('en el editar');
          //this.contenido=(res[this.datos.seccion])[0];
          this.subscription1.unsubscribe();
          this.subscription2.unsubscribe();
          //Aviso y envio al componente padre el nuevo contenido
          
          this.modalMensaje='El elemento se editó correctamente';
          //retardo el refresh de la pagina para evitar el cambio no deseado en el modal
          //setTimeout(()=>this.personaS.personaCambio(res),1000);
          this.personaS.personaCambio(res);
          setTimeout(this.cerrar.bind(this),1000);
        });         
      }
    });
    this.usuarioS.verificarToken('editorEditar');
  }

  eliminar(){
    ///-//////-///console.log('modal>editor - eliminar');
    this.modalMensaje='Guardando, por favor espere...';
    this.subscription1=this.usuarioS.verificarTokenObservable.subscribe(resp=>{
      ///-//////-///console.log('se verifica el ususario');
      if(resp=='editorEliminar'){
        //Envio la seccion y el id del elemento a eliminar
        this.subscription2=this.personaS.eliminarDB(this.datos.seccion,this.datos.id).subscribe((res)=>{
          ///-//////-///console.log('en el eliminar');
          //this.personaS.persona=res;   
          this.subscription1.unsubscribe();
          this.subscription2.unsubscribe();
          //Aviso y envio al componente padre el nuevo contenido
          this.personaS.personaCambio(res);
          this.modalMensaje='El elemento se elimino correctamente';
          setTimeout(this.cerrar.bind(this),1000);
        });         
      }
    });
    this.usuarioS.verificarToken('editorEliminar');
  }

  cerrar(){
    ///-//////-///console.log('modal>editor - cerrar');
    this.modalEmitter.emit(false);
    //this.modal=false;
    this.seccion='ninguno';
    this.modalMensaje='';
    this.accion='';
  }
  
  //json con informacion para los placeholders de los formularios o para la estructura de un nuevo elemento
  json:Personas={
    publico:false,
    resumen:
      {
        nombre: "",
        apellido: "",
        titulo: "",
        direccion: "",
        telefono: "",
        email: "",
        nacimiento: "",
        foto: "",
        banner: "",
        sobremi:"",
      },
    educaciones: 
        [
          {
            periodo: "",
            lugar: "",
            titulo: "",
            imagen: ""
          }
        ],
    experiencias: 
        [
          {
            periodo: "",
            lugar: "",
            actividades: "",
            imagen: ""
          }
        ],
    habilidades: 
        [
          {
            habilidad: "",
            valor: 100
          }
        ],
    proyectos: 
        [
          {
            titulo: "",
            periodo: "",
            descripcion: "",
            url: "",
            fotos: []
          }
        ],
    redes:[]
  }
}
