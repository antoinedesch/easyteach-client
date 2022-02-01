import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Pupil} from "../../../models/pupil";

@Component({
  selector: 'app-add-pupil-modal',
  templateUrl: './add-pupil-modal.component.html',
  styleUrls: ['./add-pupil-modal.component.scss']
})
export class AddPupilModalComponent {

  dateFilter = (d: Date | null): boolean => {
    return !(d == null || d > new Date());
  };

  constructor(
    public dialogRef: MatDialogRef<AddPupilModalComponent>,
    @Inject(MAT_DIALOG_DATA) public pupil: Pupil
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  isSaveDisable() {
    return this.pupil.surname == null || this.pupil.firstName == null;
  }

}
