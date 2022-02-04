import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {Evaluation} from "../models/evaluation";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

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
}
