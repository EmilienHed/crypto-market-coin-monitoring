import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoingeckoService {

  constructor(private http: HttpClient) { }

getCoins(): Observable<any> {
  const url = 'https://api.coingecko.com/api/v3/coins/list';
  return this.http.get<any>(url);
  }
}