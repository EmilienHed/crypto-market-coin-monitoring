import { Component } from '@angular/core';
import { CoingeckoService } from "../coingecko.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  coins: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0; // Initialisez totalPages avec une valeur par défaut
  itemsPerPage: number = 100;

  constructor(private coingeckoService: CoingeckoService) {}

  ionViewDidEnter() {
    this.coingeckoService.getCoins().subscribe(coins => {
      this.coins = coins;
      this.totalPages = Math.ceil(this.coins.length / this.itemsPerPage);
      console.log(this.coins);
    });
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
