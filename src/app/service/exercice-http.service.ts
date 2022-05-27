import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
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

  createExercise(exercise: Exercise): Observable<Exercise> {
    return this.httpClient.post<Exercise>(environment.apiUrl + "/api/exercise",exercise).pipe(map(exercice => exercice));
  }

  editExercise(exercise: Exercise): Observable<Exercise> {
    return this.httpClient.post<Exercise>(environment.apiUrl + "/api/exercise/edit",exercise).pipe(map(exercice => exercice));
  }

}
