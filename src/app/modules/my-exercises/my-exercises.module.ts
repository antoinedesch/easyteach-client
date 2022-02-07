import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyExercisesRoutingModule } from './my-exercises-routing.module';
import { MyExercicesListComponent } from './my-exercices-list/my-exercices-list.component';
import {SharedModule} from "../shared/shared.module";
import {PupilsExerciseModalComponent} from "../../components/modal/pupils-exercise-modal/pupils-exercise-modal.component";


@NgModule({
  declarations: [
    MyExercicesListComponent,
    PupilsExerciseModalComponent
  ],
  imports: [
    CommonModule,
    MyExercisesRoutingModule,
    SharedModule,
  ]
})
export class MyExercisesModule { }
