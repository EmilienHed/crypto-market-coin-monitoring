import { Component, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
import * as moment from 'moment';
import 'moment/locale/fr';
import { CoingeckoService } from "../coingecko.service";
<<<<<<< HEAD
import { StatsPage } from './stats.page';
=======
>>>>>>> de0472b54fd71bc62e53825a043dca3bee9e2636
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
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
<<<<<<< HEAD

  constructor(private coingeckoService: CoingeckoService, private router: Router) {}

=======
  coin: any;
  Router: any;

  constructor(private coingeckoService: CoingeckoService, private router: Router) {}

  
>>>>>>> de0472b54fd71bc62e53825a043dca3bee9e2636
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

<<<<<<< HEAD
  viewCoinDetails(coin: any) {
    this.selectedCoin = coin;
    this.viewDetails(coin.id);
  }

  viewDetails(id: string) {
    this.router.navigate(['/stats', id]);
  }


=======
  redirection(): void {
    this.router.navigate(['/detailsCoin'])
  }

  viewCoinDetails(id: string) {
    this.coingeckoService.getCoinDetails(id).subscribe((coin) => {
    this.selectedCoin = coin;
    this.router.navigate(['/detailsCoin', id]);
    console.log(this.selectedCoin);
    });
  }

>>>>>>> de0472b54fd71bc62e53825a043dca3bee9e2636
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
<<<<<<< HEAD

    this.coingeckoService.getCoinPriceHistory(this.selectedCoin.id).subscribe((prices: any[]) => {
      prices.forEach(price => {
        const date = new Date(price[0]);
        chartData.labels.push(date.toLocaleDateString());
        chartData.datasets[0].data.push(price[1]);
      });

      moment.locale('fr');
      Chart.register(...registerables);

      chartData.datasets[0].borderColor = 'lightblue';
=======
  
  
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
>>>>>>> de0472b54fd71bc62e53825a043dca3bee9e2636
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
<<<<<<< HEAD
}
=======
}  
>>>>>>> de0472b54fd71bc62e53825a043dca3bee9e2636
