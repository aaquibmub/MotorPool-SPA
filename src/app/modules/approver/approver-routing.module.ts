import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { ApproverComponent } from "./approver.component";
import { ApproverEditComponent } from "./components/approver-forms/approver-edit/approver-edit.component";
import { ApproverFormsComponent } from "./components/approver-forms/approver-forms.component";
import { ApproverListComponent } from "./components/approver-list/approver-list.component";
import { ApproversAllComponent } from "./components/approver-list/approvers-all/approvers-all.component";

const routes: Routes = [
  {
    path: '',
    component: ApproverComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: '',
        redirectTo: '/approvers/list/all',
        pathMatch: 'full'
      },

      // approver
      {
        path: 'approver',
        component: ApproverFormsComponent,
        children: [
          {
            path: '',
            redirectTo: '/approver/list/all',
            pathMatch: 'full'
          },
          { path: 'new', component: ApproverEditComponent },
          { path: ':id/edit', component: ApproverEditComponent },
        ]
      },
      {
        path: 'list',
        component: ApproverListComponent,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component: ApproversAllComponent },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproverRoutingModule {
}
