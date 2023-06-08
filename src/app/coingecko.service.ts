import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoingeckoService {
  environment: any;

  constructor(private http: HttpClient) { }

  getCoins(): Observable<any> {
    const url = environment.apiURL;
    return this.http.get<any>(url);
  }

  getCoinDetails(id: string): Observable<any> {
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    return this.http.get<any>(url);
  }  

  getCoinPriceHistory(id: string) {
    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`;
    const params = {
      vs_currency : 'usd',
      days: '30'
    };
    return this.http.get(url, {params}).pipe(
      map((response:any) => response.prices)
    );
  }
}
