import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/helper/services/common/utility.service';

@Component({
  selector: 'app-booking-note-list',
  templateUrl: './booking-note-list.component.html',
  styleUrls: ['./booking-note-list.component.css']
})
export class BookingNoteListComponent implements OnInit {

  pageTitle: string;

  constructor(
    private location: Location,
    public utilityService: UtilityService,
    private router: Router) {
    router.events.subscribe((event) => {
      const path = location.path();
      if (path === '/trips/booking-note-list/all') {
        this.pageTitle = 'Booking Notes';
      }
    });
  }

  handleCreateNewButtonClick(): void {
    this.router.navigate(['/trips/booking-note/new']);
  }

  ngOnInit(): void {
  }

}
