import {Component, OnInit} from '@angular/core';
import {PupilHttpServiceService} from "../service/pupil-http-service.service";
import {Pupil} from "../models/pupil";

@Component({
  selector: 'app-my-class',
  templateUrl: './my-class.component.html',
  styleUrls: ['./my-class.component.scss']
})
export class MyClassComponent implements OnInit {

  pupils: Pupil[];

  constructor(private pupilHttpService: PupilHttpServiceService) {
  }

  ngOnInit(): void {
    this.pupilHttpService.getAllPupils().subscribe((pupils) => {
      this.pupils = pupils;
    })
  }

}
