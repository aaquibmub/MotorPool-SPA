import { Component, OnInit } from '@angular/core';
import { DataImportEntity } from 'src/app/helper/common/shared-types';

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.css']
})
export class DataImportComponent implements OnInit {
  public dataImportEntity = DataImportEntity;
  constructor() { }

  ngOnInit() {
  }

}
