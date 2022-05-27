import {Component, OnInit, ViewChild} from '@angular/core';
import {ExerciceHttpService} from "../../../service/exercice-http.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Exercise} from "../../../models/exercise";
import {MatDialog} from "@angular/material/dialog";
import {
  PupilsExerciseModalComponent
} from "../../../components/modal/pupils-exercise-modal/pupils-exercise-modal.component";
import {
  ExerciseEditionModalComponent
} from "../../../components/modal/exercise-edition-modal/exercise-edition-modal.component";

@Component({
  selector: 'app-my-exercices-list',
  templateUrl: './my-exercices-list.component.html',
  styleUrls: ['./my-exercices-list.component.scss']
})
export class MyExercicesListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'date', 'linkedskills', 'actions'];
  dataSource: MatTableDataSource<Exercise>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private readonly exerciseHttpService: ExerciceHttpService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.exerciseHttpService.getTeachersAllExercises().subscribe((exercises) => {
      this.dataSource = new MatTableDataSource(exercises);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  onClickExercise(id: number) {
    const index = this.dataSource.data.map(e => e.id).indexOf(id);
    const dialogRef = this.dialog.open(PupilsExerciseModalComponent, {
      width: "50%",
      autoFocus: false,
      maxHeight: '90vh',
      data: this.dataSource.data[index]
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  editExercise(exercise?: Exercise): void {
    let exerciseToEdit;
    if (exercise) {
      exerciseToEdit = exercise
    } else {
      exerciseToEdit = new Exercise()
    }
    const dialogRef = this.dialog.open(ExerciseEditionModalComponent, {
      width: '60%',
      autoFocus: false,
      maxHeight: '90vh',
      data: exerciseToEdit
    });

    dialogRef.afterClosed().subscribe(exercise => {
      if (exercise) {
        let observable;
        if (exercise.id) {
          observable = this.exerciseHttpService.editExercise(exercise);
        } else {
          observable = this.exerciseHttpService.createExercise(exercise);
        }
        observable.subscribe(exerciseUpdated => {
          if (!exercise.id) {
            this.dataSource.data.push(exerciseUpdated);
            this.dataSource._updateChangeSubscription()
          } else {
            this.dataSource._updateChangeSubscription()
          }
        })
      }
    });
  }

}
