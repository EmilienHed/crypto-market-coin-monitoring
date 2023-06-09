import { Component, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
import * as moment from 'moment';
import { CoingeckoService } from '../coingecko.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('chartCanvas', { static: true })
  chartCanvas!: ElementRef;
  chart: any;
  coins: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  itemsPerPage: number = 10;
  filteredCoins: any[] = [];
  searchQuery: string = '';
  selectedCoin: any = null;

  constructor(private coingeckoService: CoingeckoService, private router: Router) {}

  ionViewDidEnter() {
    this.coingeckoService.getCoins().subscribe(coins => {
      this.coins = coins;
      this.totalPages = Math.ceil(this.coins.length / this.itemsPerPage);
      this.updateFilteredCoins();
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
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.filteredCoins = this.coins.slice(startIndex, endIndex);
    } else {
      this.filteredCoins = this.coins.filter((coin) =>
        coin.name.toLowerCase().includes(this.searchQuery)
      );
    }
  }

  redirection(): void {
    this.router.navigate(['/detailsCoin']);
  }

  viewCoinDetails(id: string) {
    this.coingeckoService.getCoinDetails(id).subscribe((coin) => {
      this.selectedCoin = coin;
      console.log(this.selectedCoin);
    });
  }

  showChart() {
    const chartData: { labels: string[], datasets: { label: string, data: number[], borderColor: string, fill: boolean }[] } = {
      labels: [],
      datasets: [{
        label: 'Cours du coin',
        data: [],
        borderColor: 'blue',
        fill: false
      }]
    };

    this.coingeckoService.getCoinPriceHistory(this.selectedCoin.id).subscribe((prices: any[]) => {
      prices.forEach(price => {
        const date = new Date(price[0]);
        chartData.labels.push(date.toLocaleDateString());
        chartData.datasets[0].data.push(price[1]);
      });
      console.log(chartData);

      moment.locale('fr');
      Chart.register(...registerables); // Enregistrer tous les modules nécessaires

      chartData.datasets[0].borderColor = 'lightblue';
      // Création du graphique
      this.chart = new Chart(this.chartCanvas.nativeElement as any, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          scales: {
            x: {
              min: '2023-01-01 00:00:00',
              type: 'time',
              display: true,
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Prix'
              }
            }
          }
        }
      });
    });
  }
}
