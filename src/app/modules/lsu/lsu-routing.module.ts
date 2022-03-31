import {RouterModule, Routes} from "@angular/router";
import {PupilsListComponent} from "../my-class/pupils-list/pupils-list.component";
import {PupilFileComponent} from "../my-class/pupil-file/pupil-file.component";
import {NgModule} from "@angular/core";
import {LsuEditComponent} from "./lsu-edit/lsu-edit.component";

const routes: Routes = [
  {
    path: '',
    component: LsuEditComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LsuRoutingModule {}
