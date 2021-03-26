import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Action, ActionEvent } from "../ActionEvent";
import { Dialog, DialogContent } from "../dialogs/Dialog";
import { IItem } from "../Item";
import { Filter, IFilter } from "./Filter";

@Component({
  selector: "app-extension-header",
  templateUrl: "./extension-header.component.html",
  styleUrls: ["./extension-header.component.scss"]
})
export class ExtensionHeaderComponent implements OnInit {
  @Output() action = new EventEmitter<
    ActionEvent<string | IItem | IFilter[]>
  >();
  @Output() changeFilters = new EventEmitter<IFilter[]>();
  @Input() marked;
  prefilters: IFilter[];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.prefilters = [
      // new Filter('Production', 'environment', 'PRODUCTION'),
      // new Filter('Development', 'environment', 'DEV'),
      // new Filter('Release candidate', 'environment', 'RC'),
      new Filter(
        "Expire coupon",
        "expireDate",
        null,
        (item, field) => Date.parse(item[field]) < Date.now()
      )
    ];
  }

  actions() {
    return Action;
  }

  openDialog(action: Action) {
    this.dialog
      .open<DialogContent>(Dialog.type(action))
      .afterClosed()
      .subscribe((result) => {
        if (result == undefined || !result) {
          return;
        }
        this.action.emit({
          action: action,
          data: result
        });
      });
  }

  toggleFilter(filter: IFilter) {
    filter.selected = !filter.selected;
    this.changeFilters.emit(this.prefilters);
  }

  update() {
    this.action.emit({
      action: Action.UPDATE,
      data: this.prefilters
    });
  }

  test($event: FocusEvent) {
    $event.stopImmediatePropagation();
  }
}
