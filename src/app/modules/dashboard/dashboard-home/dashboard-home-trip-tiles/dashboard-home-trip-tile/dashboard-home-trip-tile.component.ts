import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-home-trip-tile',
  templateUrl: './dashboard-home-trip-tile.component.html',
  styleUrls: ['./dashboard-home-trip-tile.component.css']
})
export class DashboardHomeTripTileComponent implements OnInit {
  @Input() iconClass: string;
  @Input() title: string;
  @Input() count: string;
  @Input() reportLink: string;
  @Input() bottomLeftLable: string;
  @Input() bottomLeftValue: string;
  @Input() bottomRightLable: string;
  @Input() bottomRightValue: string;

  constructor() { }

  ngOnInit() {
  }

}
