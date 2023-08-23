import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBasedDefaultRouteComponent } from './user-based-default-route.component';
import { UserBasedDefaultRouteRoutingModule } from './user-based-default-route-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserBasedDefaultRouteRoutingModule
  ],
  declarations: [UserBasedDefaultRouteComponent]
})
export class UserBasedDefaultRouteModule { }
