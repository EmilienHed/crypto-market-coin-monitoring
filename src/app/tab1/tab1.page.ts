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
  itemsPerPage: number = 10;
  filteredCoins: any[] = []; // New array to hold the filtered coins
  searchQuery: string = ''; // Variable to hold the search query

  constructor(private coingeckoService: CoingeckoService) {}

  ionViewDidEnter() {
    this.coingeckoService.getCoins().subscribe(coins => {
      this.coins = coins;
      this.totalPages = Math.ceil(this.coins.length / this.itemsPerPage);
      this.updateFilteredCoins(); // Update filtered coins initially
    });
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredCoins();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateFilteredCoins();
    }
  }

  searchCoins(event: any) {
    const query = event.target.value.toLowerCase();
    this.searchQuery = query;
    this.updateFilteredCoins();
  }

  updateFilteredCoins() {
    if (this.searchQuery.trim() === '') {
      // If searchQuery is empty, show paginated coins
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.filteredCoins = this.coins.slice(startIndex, endIndex);
    } else {
      // If searchQuery is present, filter the coins and show all
      this.filteredCoins = this.coins.filter((coin) =>
        coin.name.toLowerCase().includes(this.searchQuery)
      );
    }
  }
}
