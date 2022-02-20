import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSliderModule} from "@angular/material/slider";
import {MatSelectModule} from "@angular/material/select";

const MODULES: Type<any>[] = [
  MatSidenavModule, MatToolbarModule, MatIconModule, MatDividerModule, CommonModule,
  MatButtonModule, MatButtonModule,
  MatIconModule,
  MatFormFieldModule, MatTableModule, MatPaginatorModule, MatInputModule, MatSortModule,
  FormsModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatSliderModule, MatSelectModule, MatOptionModule
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MODULES
  ],
  exports: [MODULES]
})
export class AngularMaterialModule {
}
