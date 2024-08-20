import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AddressComponent } from './address.component';
import { AddressEditComponent } from './components/address-forms/address-edit/address-edit.component';
import { AddressFormsComponent } from './components/address-forms/address-forms.component';
import { AddressListComponent } from './components/address-list/address-list.component';
import { AddressesActiveComponent } from './components/address-list/addresses-active/addresses-active.component';
import { AddressesAllComponent } from './components/address-list/addresses-all/addresses-all.component';
import { AddressesInactiveComponent } from './components/address-list/addresses-inactive/addresses-inactive.component';

const routes: Routes = [
  {
    path: '',
    component: AddressComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: '',
        redirectTo: '/addresses/list/all',
        pathMatch: 'full'
      },

      // addresss
      {
        path: 'address',
        component: AddressFormsComponent,
        children: [
          {
            path: '',
            redirectTo: '/addresss/list/all',
            pathMatch: 'full'
          },
          { path: 'new', component: AddressEditComponent },
          { path: ':id/edit', component: AddressEditComponent },
        ]
      },
      {
        path: 'list',
        component: AddressListComponent,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component: AddressesAllComponent },
          { path: 'active', component: AddressesActiveComponent },
          { path: 'inactive', component: AddressesInactiveComponent },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule {
}
