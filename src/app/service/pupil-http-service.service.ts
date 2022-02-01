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

  createPupil(pupil:Pupil): Observable<Pupil> {
    return this.httpClient.post<Pupil>(environment.apiUrl + "/api/pupil/create", pupil).pipe(map((pupil:Pupil) => pupil));
  }

  deletePupil(id: number): Observable<void> {
    return this.httpClient.delete<void>(environment.apiUrl + `/api/pupil/delete/${id}` ).pipe(map(()=> {}));
  }
}
