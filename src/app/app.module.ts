import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResumenComponent } from './layout/resumen/resumen.component';
import { ExperienciasComponent } from './layout/experiencias/experiencias.component';
import { EducacionComponent } from './layout/educaciones/educacion/educacion.component';
import { HabilidadesComponent } from './layout/habilidades/habilidades.component';
import { ProyectosComponent } from './layout/proyectos/proyectos.component';
import { HttpClientModule } from '@angular/common/http';
import { EncabezadoComponent } from './layout/encabezado/encabezado.component';
import { ExperienciaComponent } from './layout/experiencias/experiencia/experiencia.component';
import { HabilidadComponent } from './layout/habilidades/habilidad/habilidad.component';
import { ProyectoComponent } from './layout/proyectos/proyecto/proyecto.component';
import { EdicionComponent } from './componentes/edicion/edicion.component';
import { ModalComponent } from './modal/modal/modal.component';
import { EducacionesComponent } from './layout/educaciones/educaciones.component';
import { AgregarComponent } from './componentes/agregar/agregar.component';
import { SesionComponent } from './modal/sesion/sesion.component';
import { FormsModule} from '@angular/forms';
import { EditorComponent } from './modal/editor/editor.component';
import { InstanciaComponent } from './modal/instancia/instancia.component';
import { AutorComponent } from './routes/autor/autor.component';
import { MiportfolioComponent } from './routes/miportfolio/miportfolio.component';
import { LayoutComponent } from './routes/layout/layout.component';
import { RedesComponent } from './layout/redes/redes.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { PublicoComponent } from './routes/publico/publico.component';
import { ToggleComponent } from './componentes/toggle/toggle.component';
import { CargandoComponent } from './componentes/cargando/cargando.component';
import { ErrorComponent } from './routes/error/error.component';
import { BannerComponent } from './layout/banner/banner.component';
import { ModosComponent } from './componentes/modos/modos.component';

@NgModule({
  declarations: [
    AppComponent,
    ResumenComponent,
    ExperienciasComponent,
    EducacionComponent,
    HabilidadesComponent,
    ProyectosComponent,
    EncabezadoComponent,
    ExperienciaComponent,
    HabilidadComponent,
    ProyectoComponent,
    EdicionComponent,
    ModalComponent,
    EducacionesComponent,
    AgregarComponent,
    SesionComponent,
    EditorComponent,
    InstanciaComponent,
    AutorComponent,
    MiportfolioComponent,
    LayoutComponent,
    RedesComponent,
    UsuarioComponent,
    PublicoComponent,
    ToggleComponent,
    CargandoComponent,
    ErrorComponent,
    BannerComponent,
    ModosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
