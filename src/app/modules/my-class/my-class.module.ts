import {NgModule} from "@angular/core";
import {MyClassComponent} from "./my-class.component";
import {MyClassRoutingModule} from "./my-class-routing.module";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {AddPupilModalComponent} from "../../components/modal/add-pupil-modal/add-pupil-modal.component";

@NgModule({
  declarations: [
    MyClassComponent,
    AddPupilModalComponent
  ],
  imports: [CommonModule,MyClassRoutingModule, SharedModule]
})
export class MyClassModule {
}
