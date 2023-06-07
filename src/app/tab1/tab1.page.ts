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
  totalPages: number = 0;
  itemsPerPage: number = 100;
  filteredCoins: any[] = []; // New array to hold the filtered coins

  constructor(private coingeckoService: CoingeckoService) {}

  ionViewDidEnter() {
    this.coingeckoService.getCoins().subscribe(coins => {
      this.coins = coins;
      this.totalPages = Math.ceil(this.coins.length / this.itemsPerPage);
      this.filteredCoins = this.coins; // Initialize filteredCoins with all coins
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

  searchCoins(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredCoins = this.coins.filter((coin) =>
      coin.name.toLowerCase().includes(query)
    );
  }
}
