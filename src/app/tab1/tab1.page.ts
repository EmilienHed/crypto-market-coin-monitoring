import { Component } from '@angular/core';
import { CoingeckoService} from "../coingecko.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private coingeckoService: CoingeckoService) {}

  coins: any[] = [];

  ionViewDidEnter() {
    this.coingeckoService.getCoins().subscribe(coins => {
      this.coins = coins;
      console.log(this.coins);
    });
  }
}
