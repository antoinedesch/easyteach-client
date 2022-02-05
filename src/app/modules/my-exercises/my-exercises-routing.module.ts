import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyExercicesListComponent} from "./my-exercices-list/my-exercices-list.component";

const routes: Routes = [
  {
    path: '',
    component: MyExercicesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyExercisesRoutingModule { }
