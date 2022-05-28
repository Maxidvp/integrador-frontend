import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargandoComponent } from './componentes/cargando/cargando.component';
import { AutorComponent } from './routes/autor/autor.component';
import { ErrorComponent } from './routes/error/error.component';
import { MiportfolioComponent } from './routes/miportfolio/miportfolio.component';
import { PublicoComponent } from './routes/publico/publico.component';

const routes: Routes = [
  {path:"miportfolio", component:MiportfolioComponent},
  {path:"error", component:ErrorComponent},
  {path:"cargando", component:CargandoComponent},
  {path:"", component:AutorComponent},
  {path:":usuario", component:PublicoComponent},
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
