import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'view',
    loadChildren: () => import('./pages/view/view.module').then(m => m.ViewModule),
  },
  {
    path: 'view/viewer',
    loadChildren: () => import('./pages/viewer/viewer.module').then(m => m.ViewerModule),
  },
  {
    path: '**',
    redirectTo: 'view'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
