import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Skill} from "../models/skill";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SkillHttpService {
  constructor(
    protected httpClient: HttpClient) {
  }

  getAllSkills(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(environment.apiUrl + "/api/skill").pipe(map((skills: Skill[]) => skills));
  }
}
