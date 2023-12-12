import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VehicalViewModel } from 'src/app/helper/models/vehicals/vehical-view-model';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { VehicalService } from 'src/app/helper/services/vehicals/vehical.service';

@Component({
  selector: 'app-vehical-view',
  templateUrl: './vehical-view.component.html',
  styleUrls: ['./vehical-view.component.scss']
})
export class VehicalViewComponent implements OnInit {

  model: VehicalViewModel;
  detailExecutePopupSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private vehicalService: VehicalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.params
      .subscribe((params: Params) => {
        if (params.id) {
          this.vehicalService.getVehicalViewModel(params.id)
            .subscribe((model: VehicalViewModel) => {
              this.model = model;
            })
        }
      });
      
  }

  cancel(): void {
    this.router.navigate(['/trips/bookings/start-now']);
  }

}
