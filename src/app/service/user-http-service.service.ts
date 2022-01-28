import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserHttpServiceService {

  constructor(
    protected httpClient: HttpClient) {
  }

  getConnectedUser(): Observable<User> {
    return this.httpClient.get<User>(environment.apiUrl + "/api/user").pipe(map((user: User) => user));
  }
}
