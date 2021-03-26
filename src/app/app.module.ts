import {ClipboardModule} from "@angular/cdk/clipboard";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from '@angular/material/table';
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {AddInfoComponent} from "./page/dialogs/add/add-info.component";
import {DeleteComponent} from "./page/dialogs/delete/delete.component";
import {UpdateComponent} from "./page/dialogs/update/update.component";
import {ExtensionHeaderComponent} from "./page/extension-header/extension-header.component";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {InfoComponent} from "./page/info/info.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatChipsModule,
    MatListModule,
    MatDividerModule,
    MatSortModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatChipsModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCheckboxModule,
    ClipboardModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    AppComponent,
    InfoComponent,
    AddInfoComponent,
    DeleteComponent,
    UpdateComponent,
    ExtensionHeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
