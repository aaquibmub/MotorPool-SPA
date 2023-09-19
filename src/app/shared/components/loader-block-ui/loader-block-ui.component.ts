import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader-block-ui',
  templateUrl: './loader-block-ui.component.html',
  styleUrls: ['./loader-block-ui.component.scss']
})
export class LoaderBlockUiComponent implements OnInit {
  loader = {
    type: 'converging-spinner',
    themeColor: 'info',
    size: 'medium',
  };
  constructor() { }

  ngOnInit(): void {
  }
}
