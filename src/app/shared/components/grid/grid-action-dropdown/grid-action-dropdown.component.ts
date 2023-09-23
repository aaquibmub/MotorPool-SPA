import { GridActionService } from './../../../../helper/services/common/grid-action.service';
import { ActionButton } from './../../../../helper/models/common/grid/action-button';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-action-dropdown',
  templateUrl: './grid-action-dropdown.component.html',
  styleUrls: ['./grid-action-dropdown.component.css']
})
export class GridActionDropdownComponent implements OnInit {
  @Input() actions: ActionButton[];
  @Input() index: number;
  @Input() states: boolean[];

  showActionMenu: boolean;

  constructor(
    private gridActionService: GridActionService
  ) { }

  ngOnInit(): void {
    // this.showActionMenu = false;
    // this.gridActionService.setActionMenusState(this.states);
    this.gridActionService.getActionMenusState()
      .subscribe(
        (states: boolean[]) => {
          this.showActionMenu = states[this.index];
        }
      );
  }

  handleButtonClick(item: ActionButton): void {
    const index = this.actions.findIndex(f => f === item);
    this.actions[index].handle();
    this.toggleActionMenu();
  }

  toggleActionMenu(): void {
    this.states[this.index] = !this.showActionMenu;
    this.gridActionService.setActionMenusState(this.states);
    // this.showActionMenu = !this.showActionMenu;
  }

}
