import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LinkedSkill} from "../models/linked-skill";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LinkedskillHttpService {

  constructor(
    protected httpClient: HttpClient) {
  }

  saveLinkedSkill(linkedskill: LinkedSkill): Observable<LinkedSkill> {
    return this.httpClient.post<LinkedSkill>(environment.apiUrl + "/api/linkedskill",linkedskill).pipe(map(linkedskill => linkedskill));
  }
}
