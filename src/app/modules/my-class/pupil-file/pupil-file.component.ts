import {Component, OnInit, ViewChild} from '@angular/core';
import {SkillHttpServiceService} from "../../../service/skill-http-service.service";
import {Skill} from "../../../models/skill";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Subject} from "../../../models/enums/Subject";

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

  displayedColumns: string[] = ['subject', 'skills','linkedSkills','evaluation'];
  dataSource: MatTableDataSource<SubjectTableData>;

  @ViewChild(MatSort) sort: MatSort;

  rowspandatasubject = {} as any;

  rowspandatasskill = {} as any;

  DATA = [] as any;

  constructor(private skillHttpService: SkillHttpServiceService) {
  }

  skills: Skill[];


  ngOnInit(): void {
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
                skill, linkedSkill: linkedSkill});
            } else {
              this.DATA.push({linkedSkill: linkedSkill})
            }
          })
        })
      })
      this.dataSource = new MatTableDataSource(this.DATA);
      this.dataSource.sort = this.sort;
    })
  }

  createSkillTableData(subject: string): SubjectTableData {
    return {
      subject: subject,
      skills: this.skills.filter((skill) => skill.subject.valueOf() === subject)
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
