import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {Evaluation} from "../models/evaluation";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {EvaluationPupil} from "../models/evaluation-pupil";

@Injectable({
  providedIn: 'root'
})
export class EvaluationHttpService {

  constructor(
    protected httpClient: HttpClient) {
  }

  getAllEvaluationByPupilId(pupilId:number):Observable<Evaluation[]> {
    return this.httpClient.get<Evaluation[]>(environment.apiUrl + `/api/evaluation/all/${pupilId}`).pipe(map((evaluations:Evaluation[]) => evaluations));
  }

  getAllEvaluationByExerciseId(exerciseId:number):Observable<EvaluationPupil[]> {
    return this.httpClient.get<EvaluationPupil[]>(environment.apiUrl + `/api/evaluation/exercise/${exerciseId}`).pipe(map((evaluationsPupil:EvaluationPupil[]) => evaluationsPupil));
  }

  addEvaluation(evaluation:Evaluation):Observable<Evaluation> {
    return this.httpClient.post<Evaluation>(environment.apiUrl + '/api/evaluation', evaluation).pipe(map((evaluation:Evaluation) => evaluation));
  }

  changeAbsent(absent: boolean, id: number): Observable<void> {
    return this.httpClient.post(environment.apiUrl + `/api/evaluation/absent/${id}/${absent}`, {}).pipe(map(()=> {}));
  }
}
