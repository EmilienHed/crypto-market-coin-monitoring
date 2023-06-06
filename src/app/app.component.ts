import { Component } from '@angular/core';
import { CoingeckoService } from './coingecko.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private coingeckoService: CoingeckoService) {}
  apiURL = environment.apiURL;


  fetchCoins() {
    this.coingeckoService.getCoins().subscribe((coins) => {
      console.log(coins);
    });
  }

  ngOnInit() {
    this.fetchCoins();
  }
}
