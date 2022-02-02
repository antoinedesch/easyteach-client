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

  displayedColumns: string[] = ['subject', 'skills','linkedSkills'];
  dataSource: MatTableDataSource<SubjectTableData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
      this.dataSource = new MatTableDataSource(datas);
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
