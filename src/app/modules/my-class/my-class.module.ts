import {NgModule} from "@angular/core";
import {MyClassComponent} from "./my-class.component";
import {MyClassRoutingModule} from "./my-class-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    MyClassComponent
  ],
  imports: [MyClassRoutingModule, CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule, MatTableModule, MatPaginatorModule, MatInputModule, MatSortModule]
})
export class MyClassModule {
}
