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
import { TablaComponent } from './componente/tabla/tabla.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResumenComponent,
    ExperienciasComponent,
    EducacionComponent,
    HabilidadesComponent,
    ProyectosComponent,
    TablaComponent
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
