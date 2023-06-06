import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoingeckoService {

  constructor(private http: HttpClient) { }

getCoins(): Observable<any> {
  const url = environment.apiURL;
  return this.http.get<any>(url);
  }
}