import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { ResumenComponent } from './layout/resumen/resumen.component';
import { ExperienciasComponent } from './layout/experiencias/experiencias.component';
import { EducacionComponent } from './layout/educacion/educacion.component';
import { HabilidadesComponent } from './layout/habilidades/habilidades.component';
import { ProyectosComponent } from './layout/proyectos/proyectos.component';
import { HttpClientModule } from '@angular/common/http';
import { TablaComponent } from './componentes/tabla/tabla.component';
import { EncabezadoComponent } from './layout/encabezado/encabezado.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { HabilidadComponent } from './componentes/habilidad/habilidad.component';
import { ProyectoComponent } from './componentes/proyecto/proyecto.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResumenComponent,
    ExperienciasComponent,
    EducacionComponent,
    HabilidadesComponent,
    ProyectosComponent,
    TablaComponent,
    EncabezadoComponent,
    ExperienciaComponent,
    HabilidadComponent,
    ProyectoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
