import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { OperacionesComponent } from './component/operaciones/operaciones.component';


const routes: Routes = [
{ path: 'operaciones/:cedula', component: OperacionesComponent},
{ path: 'login', component: LoginComponent},
{ path: '**', pathMatch: 'full', redirectTo: 'login' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
