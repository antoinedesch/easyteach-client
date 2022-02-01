import {NgModule} from "@angular/core";
import {MyClassComponent} from "./my-class.component";
import {MyClassRoutingModule} from "./my-class-routing.module";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    MyClassComponent
  ],
  imports: [CommonModule,MyClassRoutingModule, SharedModule]
})
export class MyClassModule {
}
