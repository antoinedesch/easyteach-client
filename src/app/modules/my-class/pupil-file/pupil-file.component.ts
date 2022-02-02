import {Component, OnInit} from '@angular/core';
import {SkillHttpServiceService} from "../../../service/skill-http-service.service";
import {Skill} from "../../../models/skill";

@Component({
  selector: 'app-pupil-file',
  templateUrl: './pupil-file.component.html',
  styleUrls: ['./pupil-file.component.scss']
})
export class PupilFileComponent implements OnInit {

  constructor(private skillHttpService: SkillHttpServiceService) {
  }

  skills: Skill[];

  ngOnInit(): void {
    this.skillHttpService.getAllSkills().subscribe((skills) => {
      this.skills = skills;
    })
  }

}
