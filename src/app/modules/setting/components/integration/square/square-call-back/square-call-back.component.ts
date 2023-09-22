import { SquareIntegrationService } from './../../../../../../helper/services/config/square-integration.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-square-call-back',
  templateUrl: './square-call-back.component.html',
  styleUrls: ['./square-call-back.component.css']
})
export class SquareCallBackComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private squareService: SquareIntegrationService
  ) { }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe((params: Params) => {
        if (params.code != null) {
          this.squareService.squareIntegrationCallBackConfig(params.code)
            .subscribe(
              (redirect: { url: string }) => {
                this.router.navigate([redirect.url]);
              }
            );
        } else {
        }
      });
  }

}
