import { LocationService } from './../../../../helper/services/config/location.service';
import { StoreService } from './../../../../helper/services/account/store.service';
import { DropdownItem } from './../../../../helper/models/common/dropdown-item.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  locationList: DropdownItem<string>[];
  selectedLocation: DropdownItem<string>;

  constructor(
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.locationService.getDropdownList('').subscribe(
      (list: DropdownItem<string>[]) => {
        this.locationList = list;
        this.selectedLocation = list[0];
        this.locationService.setSelectedLocation(this.selectedLocation);
      }
    );
  }

  handleLocationValueChange(value: any): void {
    this.locationService.setSelectedLocation(value);
  }

}
