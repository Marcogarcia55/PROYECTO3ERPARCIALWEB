import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { Postcreatecomponent } from './publicaciones/post-create/post-create.component';
import { PostListComponent } from './publicaciones/post-list/post-list.component';
import { PostTableComponent } from './post-table/post-table.component';
import { ExerciseMachineComponent } from './exercise-machine/exercise-machine.component';
import { InicioComponent } from './inicio/inicio.component';
import { ViewQrComponent } from './view-qr/view-qr.component';
import { SuplementSaleComponent } from './suplement-sale/suplement-sale.component';
import { PostCreateSuplComponent } from './publicaciones/post-create-supl/post-create-supl.component';
import { TicketComponent } from './ticket/ticket.component';
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';
import { InformacionComponent } from './informacion/informacion.component';

const routes: Routes = [
  { path: '', component: InicioComponent},
  { path: 'create', component: Postcreatecomponent},
  { path: 'post-list', component: PostListComponent},
  { path: 'post-table', component: PostTableComponent},
  { path: 'post-maquinas', component: ExerciseMachineComponent},
  {path: 'edit/:id', component: Postcreatecomponent},
  { path: 'post-maquinas', component: ExerciseMachineComponent},
  { path: 'view-qr', component: ViewQrComponent},
  { path: 'suplementos', component: SuplementSaleComponent},
  { path: 'create-sp', component: PostCreateSuplComponent},
  {path: 'editSup/:id', component: PostCreateSuplComponent},
  {path: 'ticket/:id', component: TicketComponent},
  {path: 'entrenamiento', component: EntrenamientoComponent},
  {path: 'informacionGym', component: InformacionComponent},






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
