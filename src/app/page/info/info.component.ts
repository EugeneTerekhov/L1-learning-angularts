import { SelectionModel } from "@angular/cdk/collections";
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import { MatChipList } from "@angular/material/chips";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Params } from "@angular/router";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Action, ActionEvent } from "../ActionEvent";
import { IFilter } from "../extension-header/Filter";
import { IItem, Item } from "../Item";
import { ISource, SourceService } from "../source.service";
import { expand } from "./Animations";
import { Clipboard } from "@angular/cdk/clipboard";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
  animations: [expand]
})
export class InfoComponent implements OnInit, OnDestroy, AfterViewInit {
  private company: string;
  private routerParams: Params;
  private params: Observable<Params>;
  private subscriptions: Subscription = new Subscription();
  //
  columns = ["name", "coupon", "address", "company"];
  attributes = ["id", "fio", "createDate", "expireDate"];
  headerColumns = ["select", ...this.columns];
  expandedElement: Item | null;
  dataSource: MatTableDataSource<Item>;
  selection: SelectionModel<Item>;

  private filtersSubject: BehaviorSubject<IFilter[]>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatChipList) chipsList;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly source: SourceService,
    public clipboard: Clipboard
  ) {
    this.params = this.route.parent.params;
    this.dataSource = new MatTableDataSource<Item>();
    this.selection = new SelectionModel<Item>(true, []);
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.params.subscribe((params) => {
        this.routerParams = params;
      })
    );
    this.company = this.getCompany();
    this.filtersSubject = new BehaviorSubject<IFilter[]>(undefined);
    // this.sort.sortChange.subscribe((sort: Sort) => {
    //   console.log('sort', this.sort.active);
    //   this.load(this.getSort());
    // });
    this.dataSource.filterPredicate = this.filterPredicate();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.filtersSubject.complete();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.load(this.source);
  }

  load(service: ISource) {
    this.subscriptions.add(
      service.load(this.company /* this.getSort() */).subscribe(
        (items) => (this.dataSource.data = items),
        () => (this.dataSource.data = [])
      )
    );
  }

  refresh($event: IFilter[]) {
    this.filtersSubject.next($event);
    this.dataSource.filter = "true";
  }

  action($event: ActionEvent<string | IItem | IFilter[]>) {
    switch ($event.action) {
      case Action.ADD: {
        this.addItem($event.data as IItem);
        break;
      }
      case Action.DELETE: {
        this.deleteItem($event.data as string);
        break;
      }
      case Action.UPDATE: {
        this.load(this.source);
        break;
      }
    }
  }

  addItem(item: IItem) {
    this.source
      .add(this.company, () => {
        item.name = this.getCompany();
        return item;
      })
      .pipe(map(() => this.load(this.source)));
  }

  deleteItem(event: string) {
    this.source
      .delete(this.getCompany(), () =>
        this.selection.selected.map((item) => item.id)
      )
      .pipe(map(() => this.load(this.source)));
    this.masterToggle();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  private filterPredicate() {
    return (item: Item, data: string): boolean => {
      if (data) {
        let selectedFilters = this.filtersSubject
          .getValue()
          .filter((filter) => filter.selected);
        if (selectedFilters.length > 0)
          return selectedFilters
            .map((filter) => {
              console.log(item);
              console.log(filter.check(item));
              console.log(filter);
              console.log(item["expireDate"]);
              console.log(Date.parse(item["expireDate"]));
              console.log(Date.now());
              return filter.check(item);
            })
            .reduce((previous, current) => previous && current);
      }
      return true;
    };
  }

  private getSort() {
    const properties: Sort = {
      field: this.sort.active,
      direction: this.sort.direction
    };
    return properties;
  }

  private getCompany() {
    return this.routerParams["company"];
  }
}

interface Sort {
  field: string;
  direction: string;
}
