import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { PoseSelectionComponent } from './pages/pose-selection/pose-selection.component';
import { PosePracticeComponent } from './pages/pose-practice/pose-practice.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthenticatedGuard] },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthenticatedGuard] },
  { path: 'poses', component: PoseSelectionComponent, canActivate: [AuthenticatedGuard] },
  {
    path: 'pose/:name/:pose',
    component: PosePracticeComponent,
    pathMatch: 'full',
    canActivate: [AuthenticatedGuard],
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
