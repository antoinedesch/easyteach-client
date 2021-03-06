import { KeycloakService } from 'keycloak-angular';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {BreakpointObserver} from "@angular/cdk/layout";
import {delay} from "rxjs";
import {UserHttpService} from "./service/user-http.service";
import {User} from "./models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'easyteach-client';

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  user: User;

  constructor(private observer: BreakpointObserver, private userHttpService: UserHttpService, private keycloakService: KeycloakService) {
  }


  ngAfterViewInit() {

    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  ngOnInit(): void {
    this.userHttpService.getConnectedUser().subscribe(user => {
      this.user = user;
    })
  }

  logout(): void {
    this.keycloakService.logout();
  }
}
