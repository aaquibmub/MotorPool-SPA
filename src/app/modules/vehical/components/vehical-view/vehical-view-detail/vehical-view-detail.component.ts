import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VehicalViewDetailModel } from 'src/app/helper/models/vehicals/vehical-view-detail-model';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { VehicalService } from 'src/app/helper/services/vehicals/vehical.service';

@Component({
  selector: 'app-vehical-view-detail',
  templateUrl: './vehical-view-detail.component.html',
  styleUrls: ['./vehical-view-detail.component.scss']
})
export class VehicalViewDetailComponent implements OnInit {

  model: VehicalViewDetailModel;

  constructor(
    public utilityService: UtilityService,
    private vehicalService: VehicalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.parent.params
      .subscribe((params: Params) => {
        if (params.id) {
          this.vehicalService.getVehicalViewDetailModel(params.id)
            .subscribe((model: VehicalViewDetailModel) => {
              this.model = model;
            })
        }
      });
  }

}

