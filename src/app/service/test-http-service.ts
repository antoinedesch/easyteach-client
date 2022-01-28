import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class TestHttpService {
  constructor(
    protected httpClient: HttpClient) {
  }

  getTest(): Observable<string> {
    return this.httpClient.get<string>(environment.apiUrl+"/api/test/teacher").pipe(map((truc:string) => truc))
  }

}
