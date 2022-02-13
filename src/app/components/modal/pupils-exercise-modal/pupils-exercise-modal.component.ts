import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Exercise} from "../../../models/exercise";
import {EvaluationHttpService} from "../../../service/evaluation-http.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {EvaluationPupil} from "../../../models/evaluation-pupil";
import {Evaluation} from "../../../models/evaluation";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";
import {MatSliderChange} from "@angular/material/slider";
import {EvaluationType} from "../../../models/enums/evaluation-type";


@Component({
  selector: 'app-pupils-exercise',
  templateUrl: './pupils-exercise-modal.component.html',
  styleUrls: ['./pupils-exercise-modal.component.scss']
})
export class PupilsExerciseModalComponent implements OnInit {

  evaluationChanged: Subject<Evaluation> = new Subject<Evaluation>();

  displayedColumns: string[] = ['surname', 'firstname', 'evaluation'];
  dataSource: MatTableDataSource<EvaluationPupil>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<PupilsExerciseModalComponent>,
              @Inject(MAT_DIALOG_DATA) public exercise: Exercise,
              private evaluationHttpService: EvaluationHttpService) {

    this.evaluationChanged.pipe(
      debounceTime(1000))
      .subscribe(evaluation => this.sendEvaluation(evaluation)
      );
  }

  ngOnInit(): void {
    this.evaluationHttpService.getAllEvaluationByExerciseId(this.exercise.id).subscribe((evaluationsPupil) => {
      evaluationsPupil.forEach((e) => {
        if (e.evaluation == null) {
          e.evaluation = new Evaluation();
        }
      })
      this.dataSource = new MatTableDataSource(evaluationsPupil);
      this.dataSource.sort = this.sort;
    })

  }

  sendEvaluation(evaluation: Evaluation): void {
    this.evaluationHttpService.addEvaluation(evaluation).subscribe();
  }

  onEvaluationSlide(evaluationPupil: EvaluationPupil,event: MatSliderChange) {
    if (event.value != null) {
      evaluationPupil.evaluation.score = event.value;
      evaluationPupil.evaluation.pupil = evaluationPupil.pupil;
      evaluationPupil.evaluation.exercise = this.exercise;
      evaluationPupil.evaluation.evaluationType = EvaluationType.EXERCISE;
      this.evaluationChanged.next(evaluationPupil.evaluation);
    }
  }

  formatLabel(value: number): string {
    if (value < 25) {
      return "Faible"
    } else if (value < 50) {
      return "Moyen"
    } else if (value < 75) {
      return "Bon"
    } else if (value < 90) {
      return "Très bien"
    } else if (value < 100) {
      return "Excellent"
    } else {
      return "Parfait";
    }
  }


}
