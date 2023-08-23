import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule
  ],
  declarations: [AuthLoginComponent]
})
export class AuthModule { }
