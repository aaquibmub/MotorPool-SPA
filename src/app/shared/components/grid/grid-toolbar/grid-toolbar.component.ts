import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ColumnBase, GridComponent } from '@progress/kendo-angular-grid';
import { ActionButton } from './../../../../helper/models/common/grid/action-button';
import { GridToolbarService } from './../../../../helper/services/common/grid-toolbar.service';
import { UtilityService } from './../../../../helper/services/common/utility.service';

@Component({
  selector: 'app-grid-toolbar',
  templateUrl: './grid-toolbar.component.html',
  styleUrls: ['./grid-toolbar.component.css']
})
export class GridToolbarComponent implements OnInit {
  @Input() grid: GridComponent;
  @Input() numberOfRecords: number;
  @Input() entity: string;
  @Input() hidePagingDropdown: boolean;
  @Input() hideExportDropdown: boolean;
  @Input() hideColumnDropdown: boolean;
  @Input() createBtn: ActionButton;
  @Input() removeBtn: ActionButton;
  @Input() buttons: ActionButton[];

  @Input() deleteBtn: ActionButton;
  @Input() hideSearchField: boolean;

  showOptionButtons = false;
  showExportMenu = false;

  showColumnMenu = false;
  columns: ColumnBase[] = [];

  pageDropdownData = [10, 25, 50, 100];

  private docClickSubscription: any;

  constructor(
    private gridToolbarService: GridToolbarService,
    private renderer: Renderer2,
    public utilityService: UtilityService,
  ) { }

  ngOnInit(): void {

    this.docClickSubscription = this.renderer.listen(
      'document',
      'click',
      this.onDocumentClick.bind(this)
    );

  }

  handlePageDropdownValueChange(pageSize: number): void {
    this.gridToolbarService.setPageSize(pageSize);
  }

  toggleOptionButtons(): void {
    this.showOptionButtons = !this.showOptionButtons;
  }

  handleCreateBtnClick(): void {
    this.createBtn.handle();
  }
  handleRemoveBtnClick(): void {
    this.removeBtn.handle();
  }

  handleDeleteBtnClick(): void {
    this.deleteBtn.handle();
  }

  handleButtonClick(item: ActionButton): void {
    const index = this.buttons.findIndex(f => f === item);
    this.buttons[index].handle();
  }

  handleCreateItemButtonClick(item: ActionButton): void {
    const index = this.createBtn.buttons.findIndex(f => f === item);
    this.createBtn.buttons[index].handle();
  }

  onSearch(query: KeyboardEvent): void {
    this.gridToolbarService.setGridSearchQuery((query.currentTarget as HTMLInputElement).value);
  }

  toggleExportDropdownMenu(): void {
    this.showExportMenu = !this.showExportMenu;
  }

  exportToExcel(): void {
    this.grid.saveAsExcel();
  }

  exportToPdf(): void {
    this.grid.saveAsPDF();
  }

  toggleColumnDropdownMenu(): void {
    this.columns = this.grid.columns.toArray();
    this.showColumnMenu = !this.showColumnMenu;
  }

  handleColumnChange(val: any): void {
    this.gridToolbarService.setGridHiddenColumn(val.field);
  }

  private onDocumentClick(e: any): void {
    const exportButtonClicked = this.utilityService.matches(
      e.target,
      '.export-dropdown .download-icon'
    );
    if (!exportButtonClicked) {
      this.showExportMenu = false;
    }
    const columnMenuInputClicked = this.utilityService.matches(
      e.target,
      '.column-menu .control input'
    );
    const columnMenuLabelClicked = this.utilityService.matches(
      e.target,
      '.column-menu .control label'
    );
    debugger;
    if (!columnMenuInputClicked && !columnMenuLabelClicked) {
      const columnButtonClicked = this.utilityService.matches(
        e.target,
        '.column-dropdown .fa-ellipsis-v'
      );
      debugger;
      if (!columnButtonClicked) {
        this.showColumnMenu = false;
      }
    }
  }



}
