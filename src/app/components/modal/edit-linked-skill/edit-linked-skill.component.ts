import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LinkedSkill} from "../../../models/linked-skill";

@Component({
  selector: 'app-edit-linked-skill',
  templateUrl: './edit-linked-skill.component.html',
  styleUrls: ['./edit-linked-skill.component.scss']
})
export class EditLinkedSkillComponent implements OnInit {

  linkedSkill: LinkedSkill;

  constructor(public dialogRef: MatDialogRef<EditLinkedSkillComponent>,
              @Inject(MAT_DIALOG_DATA) linkedSkill: LinkedSkill,
  ) {
    if ( linkedSkill.aClass == null) {
      this.linkedSkill = Object.assign({}, linkedSkill);
      this.linkedSkill.id = null;
      this.linkedSkill.parent = linkedSkill;
    } else {
      this.linkedSkill = linkedSkill;
    }

  }

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}