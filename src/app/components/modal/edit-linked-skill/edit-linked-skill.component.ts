import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LinkedSkill} from "../../../models/linked-skill";

@Component({
  selector: 'app-edit-linked-skill',
  templateUrl: './edit-linked-skill.component.html',
  styleUrls: ['./edit-linked-skill.component.scss']
})
export class EditLinkedSkillComponent {

  linkedSkill: LinkedSkill;

  editMode: boolean = false;

  constructor(public dialogRef: MatDialogRef<EditLinkedSkillComponent>,
              @Inject(MAT_DIALOG_DATA) linkedSkill: LinkedSkill
  ) {
    if (linkedSkill.id) {
      this.editMode = true;
      if (linkedSkill.aClass == null) {
        this.linkedSkill = Object.assign({}, linkedSkill);
        this.linkedSkill.id = null;
        this.linkedSkill.parent = linkedSkill;
        this.linkedSkill.skill = null;
      } else {
        this.linkedSkill = linkedSkill;
      }
    } else {
      this.linkedSkill = linkedSkill;
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
