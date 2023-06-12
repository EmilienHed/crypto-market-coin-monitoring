import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  constructor(private http: HttpClient) {}

  getCryptoData(cryptoId: string): Observable<any> {
    const url = `https://api.coingecko.com/api/v3/coins/${cryptoId}`;
    return this.http.get<any>(url);
  }
}
