import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyExercisesRoutingModule } from './my-exercises-routing.module';
import { MyExercicesListComponent } from './my-exercices-list/my-exercices-list.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    MyExercicesListComponent
  ],
  imports: [
    CommonModule,
    MyExercisesRoutingModule,
    SharedModule
  ]
})
export class MyExercisesModule { }
