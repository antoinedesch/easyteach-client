import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Exercise} from "../../../models/exercise";
import {Section} from "../../../models/enums/section";
import {SkillHttpService} from "../../../service/skill-http.service";
import {Skill} from "../../../models/skill";
import {LinkedSkill} from "../../../models/linked-skill";

@Component({
  selector: 'app-add-exercise-modal',
  templateUrl: './exercise-edition-modal.component.html',
  styleUrls: ['./exercise-edition-modal.component.scss']
})
export class ExerciseEditionModalComponent implements OnInit {

  skills: Skill[];

  savedSkills: Skill[];

  constructor(
    public dialogRef: MatDialogRef<ExerciseEditionModalComponent>,
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

  compareLinkedSkill(linkedSkill1: LinkedSkill, linkedSkill2: LinkedSkill): boolean {
    return linkedSkill1?.id == linkedSkill2?.id;
  }

  onKey(event: any) {
    if (event.value == null || event.value === "") {
      this.skills = this.savedSkills;
    } else {
      this.skills = this.search(event.value);
    }
  }
}
