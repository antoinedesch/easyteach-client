import {NgModule} from "@angular/core";
import {PupilsListComponent} from "./pupils-list/pupils-list.component";
import {MyClassRoutingModule} from "./my-class-routing.module";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {AddPupilModalComponent} from "../../components/modal/add-pupil-modal/add-pupil-modal.component";
import {PupilFileComponent} from './pupil-file/pupil-file.component';
import {EditLinkedSkillComponent} from "../../components/modal/edit-linked-skill/edit-linked-skill.component";

@NgModule({
  declarations: [
    PupilsListComponent,
    AddPupilModalComponent,
    PupilFileComponent,
    EditLinkedSkillComponent
  ],
  imports: [CommonModule, MyClassRoutingModule, SharedModule]
})
export class MyClassModule {
}
