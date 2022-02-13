import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Exercise} from "../../../models/exercise";
import {Section} from "../../../models/enums/section";
import {SkillHttpService} from "../../../service/skill-http.service";
import {Skill} from "../../../models/skill";

@Component({
  selector: 'app-add-exercise-modal',
  templateUrl: './add-exercise-modal.component.html',
  styleUrls: ['./add-exercise-modal.component.scss']
})
export class AddExerciseModalComponent implements OnInit {

  skills: Skill[];

  savedSkills: Skill[];

  constructor(
    public dialogRef: MatDialogRef<AddExerciseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public exercise: Exercise,
    private skillHttpService: SkillHttpService
  ) {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  isSaveDisable() {
    return this.exercise.name == null || this.exercise.section == null || this.exercise.linkedSkills == null || this.exercise.linkedSkills.length == 0;
  }

  loadAllLinedSkills(): void {
    this.skillHttpService.getAllSkills().subscribe((skills) => {
      this.skills = skills;
      this.savedSkills = skills;
    })
  }

  getAllSections(): string[] {
    return Object.values(Section);
  }

  ngOnInit(): void {
    this.loadAllLinedSkills();
  }

  search(value: string): Skill[] {
    let filter = value.toLowerCase();
    let res: Skill[] = [];
    this.skills.forEach((skill) => {
      if (skill.name.toLowerCase().startsWith(filter)) {
        res.push(skill)
      } else {
        let skillToAdd = Object.assign({}, skill);
        skillToAdd.linkedSkills = skillToAdd.linkedSkills.filter(linkedSkill => linkedSkill.name.toLowerCase().startsWith(filter));
        if (skillToAdd.linkedSkills.length > 0) {
          res.push(skillToAdd);
        }
      }
    })
    return res;
  }

  onKey(event: any) {
    if (event.value == null || event.value === "") {
      this.skills = this.savedSkills;
    } else {
      this.skills = this.search(event.value);
    }
  }
}
