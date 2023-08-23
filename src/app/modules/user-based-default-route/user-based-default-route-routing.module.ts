import { UserBasedDefaultRouteComponent } from './user-based-default-route.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UserBasedDefaultRouteComponent,
    data: {
      title: 'Default'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserBasedDefaultRouteRoutingModule { }
