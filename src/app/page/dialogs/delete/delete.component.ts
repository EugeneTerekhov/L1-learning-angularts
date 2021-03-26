import { Component, OnInit } from "@angular/core";
import { SourceService } from "../../source.service";
import { DialogContent } from "../Dialog";

@Component({
  selector: "app-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.scss"]
})
export class DeleteComponent implements OnInit, DialogContent {
  constructor(public source: SourceService) {}

  ngOnInit(): void {}
}
