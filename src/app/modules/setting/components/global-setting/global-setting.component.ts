import { LocationService } from './../../../../helper/services/config/location.service';
import { StoreService } from './../../../../helper/services/account/store.service';
import { DropdownItem } from './../../../../helper/models/common/dropdown-item.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-setting',
  templateUrl: './global-setting.component.html',
  styleUrls: ['./global-setting.component.css']
})
export class GlobalSettingComponent implements OnInit {

  constructor(
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    // this.locationService.setSelectedLocation(null);
  }

}
