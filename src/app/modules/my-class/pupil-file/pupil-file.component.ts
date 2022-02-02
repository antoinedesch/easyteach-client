import {Component, OnInit, ViewChild} from '@angular/core';
import {SkillHttpServiceService} from "../../../service/skill-http-service.service";
import {Skill} from "../../../models/skill";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
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

  displayedColumns: string[] = ['subject', 'skills'];
  dataSource: MatTableDataSource<SubjectTableData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ROWSPANDATA = {} as any;

  DATA = [] as any;

  constructor(private skillHttpService: SkillHttpServiceService) {
  }

  skills: Skill[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.skillHttpService.getAllSkills().subscribe((skills) => {
      this.skills = skills;
      let datas = Object.values(Subject).map(subject => this.createSkillTableData(subject));
      datas.forEach(row => {
        this.ROWSPANDATA[row.subject] = row.skills.length
        row.skills.forEach((desc, index) => {
          if (index === 0) {
            this.DATA.push({subject: row.subject, skill:
              desc, linkedSkills: desc.linkedSkills});
          } else {
            this.DATA.push({skill: desc})
          }
        })
      })
      this.dataSource = new MatTableDataSource(this.DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  createSkillTableData(subject: string): SubjectTableData {
    return {
      subject: subject,
      skills: this.skills.filter((skill) => skill.subject.valueOf() === subject)
    }
  };

}

export class RowspanDataSubject {
  subjectRowspan:number;
  skillsRownspan:number;
}
