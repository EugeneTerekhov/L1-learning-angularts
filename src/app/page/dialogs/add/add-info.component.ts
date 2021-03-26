import { Component, OnInit } from "@angular/core";
import { IItem } from "../../Item";
import { SourceService } from "../../source.service";
import { DialogContent } from "../Dialog";

@Component({
  selector: "app-add-info",
  templateUrl: "./add-info.component.html",
  styleUrls: ["./add-info.component.scss"]
})
export class AddInfoComponent implements OnInit, DialogContent {
  name: string;
  coupon: string;
  fio: string;
  address: string;
  company: string;

  constructor(public source: SourceService) {}

  ngOnInit(): void {}

  isNotBlank(...strings: string[]): boolean {
    return strings.filter(str => !str || str.length === 0).length > 0;
  }

  item(): IItem {
    return {
      name: this.name,
      coupon: this.coupon,
      fio: this.fio,
      address: this.address,
      company: this.company
    };
  }
}
