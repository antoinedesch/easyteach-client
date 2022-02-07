import {Component, OnInit, ViewChild} from '@angular/core';
import {ExerciceHttpService} from "../../../service/exercice-http.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Exercise} from "../../../models/exercise";
import {ConfirmationModalComponent} from "../../../components/modal/confirmation-modal/confirmation-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {PupilsExerciseModalComponent} from "../../../components/modal/pupils-exercise-modal/pupils-exercise-modal.component";

@Component({
  selector: 'app-my-exercices-list',
  templateUrl: './my-exercices-list.component.html',
  styleUrls: ['./my-exercices-list.component.scss']
})
export class MyExercicesListComponent implements OnInit {

  displayedColumns: string[] = ['id','name','date','actions'];
  dataSource: MatTableDataSource<Exercise>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private readonly exerciseHttpService:ExerciceHttpService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.exerciseHttpService.getTeachersAllExercises().subscribe((exercises) => {
      this.dataSource = new MatTableDataSource(exercises);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  onClickExercise(id:number) {
    const index = this.dataSource.data.map(e => e.id).indexOf(id);
    const dialogRef = this.dialog.open(PupilsExerciseModalComponent, {
      width: "50%",
      data: this.dataSource.data[index]
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
      }
    });
  }

}
