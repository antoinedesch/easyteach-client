import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Exercise} from "../../../models/exercise";
import {EvaluationHttpService} from "../../../service/evaluation-http.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {EvaluationPupil} from "../../../models/evaluation-pupil";
import {Evaluation} from "../../../models/evaluation";
import {debounceTime, Subject} from "rxjs";
import {MatSliderChange} from "@angular/material/slider";
import {EvaluationType} from "../../../models/enums/evaluation-type";


@Component({
  selector: 'app-pupils-exercise',
  templateUrl: './pupils-exercise-modal.component.html',
  styleUrls: ['./pupils-exercise-modal.component.scss']
})
export class PupilsExerciseModalComponent implements OnInit {

  evaluationChangedArray: Subject<Evaluation>[] = [];

  displayedColumns: string[] = ['surname', 'firstname', 'evaluation', 'absent'];
  dataSource: MatTableDataSource<EvaluationPupil>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<PupilsExerciseModalComponent>,
              @Inject(MAT_DIALOG_DATA) public exercise: Exercise,
              private evaluationHttpService: EvaluationHttpService) {


  }

  ngOnInit(): void {
    let subject
    this.evaluationHttpService.getAllEvaluationByExerciseId(this.exercise.id).subscribe((evaluationsPupil) => {
      evaluationsPupil.forEach((e) => {
        if (e.evaluation == null) {
          e.evaluation = new Evaluation();
        }
        subject = new Subject<Evaluation>();
        subject.pipe(debounceTime(1000)).subscribe(evaluation => this.sendEvaluation(evaluation));
        this.evaluationChangedArray.push(subject);
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
      let index = this.dataSource.data.map(e => e.pupil.id).indexOf(evaluationPupil.pupil.id);
      this.evaluationChangedArray[index].next(evaluationPupil.evaluation);
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


  changeAbsent(event: any, evaluationPupil: EvaluationPupil) {
    if ( evaluationPupil.evaluation.id) {
      this.evaluationHttpService.changeAbsent(event.checked, evaluationPupil.evaluation.id).subscribe(() => {
        evaluationPupil.evaluation.absent = event.checked;
      })
    } else {
      evaluationPupil.evaluation.absent = event.checked;
      evaluationPupil.evaluation.score = event.value;
      evaluationPupil.evaluation.pupil = evaluationPupil.pupil;
      evaluationPupil.evaluation.exercise = this.exercise;
      evaluationPupil.evaluation.evaluationType = EvaluationType.EXERCISE;
      this.sendEvaluation(evaluationPupil.evaluation);
    }

  }
}
