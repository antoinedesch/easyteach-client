import {NgModule, Type} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
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
import {StopPropagationDirective} from "../../directives/stop-propagation.directive";
import {ConfirmationModalComponent} from "../../components/modal/confirmation-modal/confirmation-modal.component";
import {nl2brPipe} from "../../pipe/nl2brPipe";
import {MatSliderModule} from "@angular/material/slider";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

const COMPONENTS: Type<any>[] = [
  ConfirmationModalComponent
]

const DIRECTIVES: Type<any>[] = [
  StopPropagationDirective
]

const PIPES: Type<any>[] = [
  nl2brPipe
]

const MODULES: Type<any>[] = [
  CommonModule,
  FormsModule,
  MatSidenavModule, MatToolbarModule, MatIconModule, MatDividerModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatTableModule,
  MatPaginatorModule, MatInputModule, MatSortModule,
  FormsModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatSliderModule, MatSelectModule, MatOptionModule, MatSlideToggleModule
]

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  imports: [
    ...MODULES
  ],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  providers: [DatePipe]
})
export class SharedModule {
}
