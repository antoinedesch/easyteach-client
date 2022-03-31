import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LsuEditComponent} from './lsu-edit/lsu-edit.component';
import {LsuRoutingModule} from "./lsu-routing.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    LsuEditComponent
  ],
  imports: [
    CommonModule,
    LsuRoutingModule,
    SharedModule
  ]
})
export class LsuModule {
}
