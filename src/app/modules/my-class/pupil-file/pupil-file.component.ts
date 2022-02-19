import {Component, OnInit, ViewChild} from '@angular/core';
import {SkillHttpService} from "../../../service/skill-http.service";
import {Skill} from "../../../models/skill";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Subject} from "../../../models/enums/subject";
import {EvaluationHttpService} from "../../../service/evaluation-http.service";
import {Evaluation} from "../../../models/evaluation";
import {ActivatedRoute} from "@angular/router";
import {EvaluationValue} from "../../../models/enums/evaluation-value";
import {Objective} from "../../../models/objective";
import {LinkedSkill} from "../../../models/linked-skill";
import {EvaluationType} from "../../../models/enums/evaluation-type";
import {MatDialog} from "@angular/material/dialog";
import {EditLinkedSkillComponent} from "../../../components/modal/edit-linked-skill/edit-linked-skill.component";
import {LinkedskillHttpService} from "../../../service/linkedskill-http.service";

export interface SubjectTableData {
  subject: string,
  objectSkillsArray: ObjectiveSkills[]
}


export interface ObjectiveSkills {
  objective: Objective,
  skills: Skill[]
}

@Component({
  selector: 'app-pupil-file',
  templateUrl: './pupil-file.component.html',
  styleUrls: ['./pupil-file.component.scss']
})
export class PupilFileComponent implements OnInit {

  displayedColumns: string[] = ['subject', 'objectives', 'skills', 'linkedSkills', 'evaluationLinkedSkill', 'evaluation'];
  dataSource: MatTableDataSource<SubjectTableData>;

  @ViewChild(MatSort) sort: MatSort;

  rowspandatasubject = {} as any;

  rowspandatasskill = {} as any;

  rowspandataobjective = {} as any;


  DATA = [] as any;

  constructor(private readonly skillHttpService: SkillHttpService,
              private readonly evaluationHttpService: EvaluationHttpService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private readonly linkedSkillHttpService: LinkedskillHttpService) {
  }

  skills: Skill[];

  evaluations: Evaluation[];

  refreshGrid() {
    this.rowspandatasubject = {} as any;
    this.rowspandatasskill = {} as any;
    this.rowspandataobjective = {} as any;
    this.DATA = [];
    this.ngOnInit();
  }

  ngOnInit(): void {
    let pupiId = Number(this.route.snapshot.paramMap.get('id'));
    this.evaluationHttpService.getAllEvaluationByPupilId(pupiId).subscribe((evaluations) => {
      this.evaluations = evaluations;
      this.skillHttpService.getAllSkills().subscribe((skills) => {
        this.skills = skills;
        let datas = this.createSkillTableData();
        // @ts-ignore
        Object.keys(datas).forEach((subject: string) => {
          this.rowspandatasubject[subject] = 0;
          // @ts-ignore
          Object.keys(datas[subject]).forEach((objectiveId: number, index_obj) => {
            let nbLinkedSkills = 1;
            // @ts-ignore
            datas[subject][objectiveId].forEach(test => {
              nbLinkedSkills += test.linkedSkills.length;
            })
            if (this.rowspandataobjective[objectiveId]) {
              this.rowspandataobjective[objectiveId] += nbLinkedSkills;

            } else {
              this.rowspandataobjective[objectiveId] = nbLinkedSkills;
            }
            this.rowspandatasubject[subject] += nbLinkedSkills;
            if (index_obj == 0) {
              this.DATA.push({subject: subject, objective: objectiveId})
            } else {
              this.DATA.push({objective: objectiveId})
            }
            // @ts-ignore
            datas[subject][objectiveId].forEach((skill) => {
              this.rowspandatasskill[skill.id] = skill.linkedSkills.length;
              skill.linkedSkills.forEach((linkedSkill: any, linked_skill: number) => {
                let d = {
                  linkedSkill: {
                    name: linkedSkill.name,
                    id: linkedSkill.id,
                    skill: {
                      id: linkedSkill.skill?.id
                    },
                    evaluationScore: this.getEvaluationLinkedSkillValue(linkedSkill)
                  }, skill: undefined, evaluationSkill: undefined
                };
                if (linked_skill == 0) {
                  d.skill = skill;
                  // @ts-ignore
                  d.evaluationSkill = {
                    id: skill.id,
                    value: this.getEvaluationValue(skill),
                  };
                }
                this.DATA.push(d);

              })

            })
          })
        })
        this.dataSource = new MatTableDataSource(this.DATA);
        this.dataSource.sort = this.sort;
      })
    })

  }

  getEvaluationValueString(value: EvaluationValue): string {
    switch (value) {
      case EvaluationValue.ACQUIRE:
        return 'ACQUIS';
      case EvaluationValue.BEING_ACQUIRED:
        return 'EN COURS D\'ACQUISITION';
      case EvaluationValue.NON_ACQUIRED:
        return 'NON ACQUIS';
      case EvaluationValue.ABSENT:
        return 'ABSENT';
    }
  }

  getEvaluationValue(skill: Skill): string {
    let evaluation: Evaluation = this.evaluations.filter((evaluation) => evaluation.skill && evaluation.skill.id === skill.id)[0];
    return evaluation ? this.getEvaluationValueString(evaluation.value) : ""
  }

  createSkillTableData(): any {
    let res = {} as any;
    this.skills.forEach((skill) => {
      skill.linkedSkills.push(new LinkedSkill())
      if (!res[skill.objective.subject]) {
        res[skill.objective.subject] = {} as any;
      }
      if (res[skill.objective.subject][skill.objective.id]) {
        res[skill.objective.subject][skill.objective.id].push(skill)
      } else {
        res[skill.objective.subject][skill.objective.id] = [skill];
      }
    })
    return res;
  };

  getSubjectName(subject: string): string {
    switch (subject) {
      case Subject.FRENCH.valueOf():
        return "Français";
      case Subject.MATHEMATICS.valueOf():
        return "Mathématiques";
      default:
        return "Matière inconnue";
    }
  }

  getObjectiveName(objectiveId: number) {
    return this.skills.filter(skill => skill.objective.id == objectiveId)[0].objective.name;
  }

  getEvaluationLinkedSkillValue(linkedSkill: LinkedSkill): number | null {
    let pupilEvaluations = this.evaluations.filter((evaluation) => evaluation.evaluationType == EvaluationType.LINKED_SKILL && (evaluation.linkedSkill.id == linkedSkill.id || (linkedSkill.parent && evaluation.linkedSkill.id == linkedSkill.parent.id)));
    if (pupilEvaluations.length > 0) {
      return pupilEvaluations[0].score;
    }
    return null;
  }

  onEditLinkedSkill(linkedSkill: LinkedSkill) {
    const dialogRef = this.dialog.open(EditLinkedSkillComponent, {
      width: '30%',
      data: linkedSkill
    });

    dialogRef.afterClosed().subscribe(linkedSkill => {
      if (linkedSkill) {
        this.linkedSkillHttpService.saveLinkedSkill(linkedSkill).subscribe((linkedSkill) => {
          this.refreshGrid();
        })
      }
    });

  }
}
