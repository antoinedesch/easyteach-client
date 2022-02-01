import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PupilsListComponent} from "./pupils-list/pupils-list.component";
import {PupilFileComponent} from "./pupil-file/pupil-file.component";

const routes: Routes = [
  {
    path: '',
    component: PupilsListComponent
  },{
    path: 'pupil/:id',
    component: PupilFileComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyClassRoutingModule {}
