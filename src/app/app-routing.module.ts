import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { Full_ROUTES } from './shared/routes/full-layout.routes';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { CONTENT_ROUTES } from './shared/routes/content-layout.routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'default',
    pathMatch: 'full'
  },
  {
    path: '', component: FullLayoutComponent,
    data: { title: 'full Views' },
    children: Full_ROUTES
  },
  {
    path: '', component: ContentLayoutComponent,
    data: { title: 'content Views' },
    children: CONTENT_ROUTES
  },
  {
    path: '**',
    redirectTo: 'default'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
