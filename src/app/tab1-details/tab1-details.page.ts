import { Component, ElementRef, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-tab1-details',
  templateUrl: './tab1-details.page.html',
  styleUrls: ['./tab1-details.page.scss'],
})
export class Tab1DetailsPage implements OnInit {
  chartCanvas!: ElementRef;
  chart: any;
  coins: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  itemsPerPage: number = 10;
  filteredCoins: any[] = [];
  searchQuery: string = '';
  selectedCoin: any = null;
  Router: any;
  coingeckoService: any;

  constructor() { }

  ngOnInit() {
  }

  viewCoinDetails(id: string) {
    this.coingeckoService.getCoinDetails(id).subscribe((coin: any) => {
    this.selectedCoin = coin;
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
