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

export interface SubjectTableData {
  subject: string;
  skills: Skill[]
}

@Component({
  selector: 'app-pupil-file',
  templateUrl: './pupil-file.component.html',
  styleUrls: ['./pupil-file.component.scss']
})
export class PupilFileComponent implements OnInit {

  displayedColumns: string[] = ['subject', 'skills','linkedSkills','evaluationLinkedSkill','evaluation'];
  dataSource: MatTableDataSource<SubjectTableData>;

  @ViewChild(MatSort) sort: MatSort;

  rowspandatasubject = {} as any;

  rowspandatasskill = {} as any;

  DATA = [] as any;

  constructor(private skillHttpService: SkillHttpService, private evaluationHttpService:EvaluationHttpService, private route: ActivatedRoute) {
  }

  skills: Skill[];

  evaluations: Evaluation[];

  ngOnInit(): void {
    let pupiId = Number(this.route.snapshot.paramMap.get('id'));
    this.evaluationHttpService.getAllEvaluationByPupilId(pupiId).subscribe((evaluations) => {
      this.evaluations = evaluations;
      this.skillHttpService.getAllSkills().subscribe((skills) => {
        this.skills = skills;
        let datas = Object.values(Subject).map(subject => this.createSkillTableData(subject));
        datas.forEach(row => {
          this.rowspandatasubject[row.subject] = row.skills.reduce((acc,skill) => acc + skill.linkedSkills.length, 1);
          row.skills.forEach((skill, index_skill) => {
            if (index_skill === 0) {
              this.DATA.push({subject: row.subject});
            }
            this.rowspandatasskill[skill.id] = skill.linkedSkills.length;
            skill.linkedSkills.forEach((linkedSkill,index_linkedskill) => {
              if (index_linkedskill === 0) {
                this.DATA.push({skill:
                  skill, linkedSkill: linkedSkill, evaluationSkill:skill});
              } else {
                this.DATA.push({linkedSkill: linkedSkill})
              }
            })
          })
        })
        this.dataSource = new MatTableDataSource(this.DATA);
        this.dataSource.sort = this.sort;
      })
    })

  }

  getEvaluationValueString(value:EvaluationValue): string {
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

  getEvaluationValue(skill:Skill): string {
    let evaluation:Evaluation = this.evaluations.filter((evaluation) => evaluation.skill.id === skill.id)[0];
    return evaluation ? this.getEvaluationValueString(evaluation.value) : ""
  }

  createSkillTableData(subject: string): SubjectTableData {
    return {
      subject: subject,
      skills: this.skills.filter((skill) => skill.objective.subject.valueOf() === subject)
    }
  };

  getSubjectName(subject: string):string{
    switch (subject) {
      case Subject.FRENCH.valueOf():
        return "Français";
      case Subject.MATHEMATICS.valueOf():
        return "Mathématiques";
      default:
        return "Matière inconnue";
    }
  }
}

export class RowspanDataSubject {
  subjectRowspan:number;
  skillsRownspan:number;
}
