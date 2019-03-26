import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class APIDataService {
  constructor(private http: HttpClient) {}

  getAnagrafica(): Observable<IAnagrafica> {
    return this.http.get<IAnagrafica>(environment.baseapi + "/fakeapi.json");
  }

  getProvList(): Observable<IProvincia[]> {
    return this.http.get<IProvincia[]>(environment.baseapi + "/province.json");
  }
}
