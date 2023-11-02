import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { HomeComponent } from './home/home.component';
import { AccesGuard } from './gurd/acces.guard';

const routes: Routes = [
  {path:'inbox', component:HomeComponent,canActivate:[AccesGuard]},
  {path:'result', component:ResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
