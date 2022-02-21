import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedesComponent } from './layout/redes/redes.component';
import { SesionComponent } from './modal/sesion/sesion.component';
import { AutorComponent } from './routes/autor/autor.component';
import { MiportfolioComponent } from './routes/miportfolio/miportfolio.component';

const routes: Routes = [
  {path:"miportfolio", component:MiportfolioComponent},
  {path:"", component:AutorComponent},
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
