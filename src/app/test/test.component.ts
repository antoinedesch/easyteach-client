import { Component, OnInit } from '@angular/core';
import {TestHttpService} from "../service/test-http-service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private testhttpservice:TestHttpService) { }

  ngOnInit(): void {
    this.testhttpservice.getTest().subscribe((response) => {
      console.log(response);
    })
  }

}
