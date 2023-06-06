import { Component } from '@angular/core';
import { CoingeckoService } from './coingecko.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private coingeckoService: CoingeckoService) {}

  fetchCoins() {
    this.coingeckoService.getCoins().subscribe((coins) => {
      console.log(coins);
    });
  }

  ngOnInit() {
    this.fetchCoins();
  }
}
