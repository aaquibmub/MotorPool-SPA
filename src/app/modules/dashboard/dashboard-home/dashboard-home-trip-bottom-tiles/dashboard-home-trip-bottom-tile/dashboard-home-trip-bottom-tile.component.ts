import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-home-trip-bottom-tile',
  templateUrl: './dashboard-home-trip-bottom-tile.component.html',
  styleUrls: ['./dashboard-home-trip-bottom-tile.component.css']
})
export class DashboardHomeTripBottomTileComponent implements OnInit {
  @Input() iconClass: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() count: string;
  @Input() reportLink: string;

  constructor() { }

  ngOnInit() {
  }

}

