import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AuthLoginComponent,
        data: {
          title: 'Sign In'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
