import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {LinkedSkill} from "../models/linked-skill";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Exercise} from "../models/exercise";

@Injectable({
  providedIn: 'root'
})
export class ExerciceHttpService {

  constructor(
    protected httpClient: HttpClient) {
  }

  getTeachersAllExercises(): Observable<Exercise[]> {
    return this.httpClient.get<Exercise[]>(environment.apiUrl + "/api/exercise").pipe(map(exercices => exercices));
  }

}
