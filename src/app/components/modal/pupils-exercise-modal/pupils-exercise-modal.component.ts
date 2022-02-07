import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Exercise} from "../../../models/exercise";
import {ExerciceHttpService} from "../../../service/exercice-http.service";
import {EvaluationHttpService} from "../../../service/evaluation-http.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {SubjectTableData} from "../../../modules/my-class/pupil-file/pupil-file.component";
import {EvaluationPupil} from "../../../models/evaluation-pupil";
import {Evaluation} from "../../../models/evaluation";

@Component({
  selector: 'app-pupils-exercise',
  templateUrl: './pupils-exercise-modal.component.html',
  styleUrls: ['./pupils-exercise-modal.component.scss']
})
export class PupilsExerciseModalComponent implements OnInit {

  displayedColumns: string[] = ['surname', 'firstname','evaluation'];
  dataSource: MatTableDataSource<EvaluationPupil>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<PupilsExerciseModalComponent>,
              @Inject(MAT_DIALOG_DATA) public exercise: Exercise,
              private evaluationHttpService:EvaluationHttpService) {
  }

  ngOnInit(): void {
    this.evaluationHttpService.getAllEvaluationByExerciseId(this.exercise.id).subscribe((evaluationsPupil) => {
      evaluationsPupil.forEach((e) => {
        if ( e.evaluation == null) {
          e.evaluation = new Evaluation();
        }
      })
      this.dataSource = new MatTableDataSource(evaluationsPupil);
      this.dataSource.sort = this.sort;
    })

  }

}
