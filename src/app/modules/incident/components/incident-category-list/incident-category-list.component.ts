
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from './../../../../helper/services/common/utility.service';

@Component({
  selector: 'app-incident-category-list',
  templateUrl: './incident-category-list.component.html',
  styleUrls: ['./incident-category-list.component.css']
})
export class IncidentCategoryListComponent implements OnInit {
  pageTitle: string;

  constructor(
    private location: Location,
    public utilityService: UtilityService,
    private router: Router) {
    router.events.subscribe((event) => {
      const path = location.path();
      if (path === '/incident/list/all') {
        this.pageTitle = 'Incident Category';
      }
    });
  }

  handleCreateNewButtonClick(): void {
    this.router.navigate(['/incident/category/new']);
  }

  ngOnInit(): void {
  }

}
