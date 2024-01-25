import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/helper/services/common/utility.service';

@Component({
  selector: 'app-approver-list',
  templateUrl: './approver-list.component.html',
  styleUrls: ['./approver-list.component.scss']
})
export class ApproverListComponent implements OnInit {

  pageTitle: string;

  constructor(
    private location: Location,
    public utilityService: UtilityService,
    private router: Router) {
    router.events.subscribe((event) => {
      const path = location.path();
      if (path === '/approvers/list/all') {
        this.pageTitle = 'Approvers';
      }
    });
  }

  handleCreateNewButtonClick(): void {
    this.router.navigate(['/approvers/approver/new']);
  }

  ngOnInit(): void {
  }

}
