import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Pupil} from "../models/pupil";
import {User} from "../models/user";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PupilHttpServiceService {

  constructor(
    protected httpClient: HttpClient) {
  }

  getAllPupils(): Observable<Pupil[]> {
    return this.httpClient.get<Pupil[]>(environment.apiUrl + "/api/pupil/all").pipe(map((pupils:Pupil[]) => pupils));
  }
}
