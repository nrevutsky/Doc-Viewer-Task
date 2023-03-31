import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'view',
    loadChildren: () => import('./pages/view/view.module').then(m => m.ViewModule),
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
