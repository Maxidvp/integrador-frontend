import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Personas } from 'src/app/interfaz/Personas';
import { ConexionService } from 'src/app/servicios/conexion.service';

@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styleUrls: ['./publico.component.scss']
})
export class PublicoComponent implements OnInit {

  persona:Personas=this.conexionS.persona;
  listo:boolean=false;
  publico:boolean=false;

  constructor(private conexionS:ConexionService, private route:ActivatedRoute, private router: Router) { 
    this.route.params.subscribe(res=>{
      console.log();
      this.conexionS.getPublico(res['usuario']).subscribe(res2=>{
        console.log('res2');
        console.log(res2);
        if(res2){
          this.persona=res2;
          this.publico=true;
        }
        this.listo=true;
      },(error) => {  
        this.router.navigate(['error']);
      })
    });
  }

  ngOnInit(): void {
  }

}
