<<<<<<< HEAD
import { Component, ElementRef, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as moment from 'moment';
=======
<<<<<<< HEAD
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
import * as moment from 'moment';
import { CoingeckoService } from '../coingecko.service';
import { Router } from '@angular/router';
=======
import { Component, ElementRef, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as moment from 'moment';
>>>>>>> 64701ef9a80c71ff735964bf31530d21deb7e8e1
>>>>>>> de0472b54fd71bc62e53825a043dca3bee9e2636

@Component({
  selector: 'app-tab1-details',
  templateUrl: './tab1-details.page.html',
  styleUrls: ['./tab1-details.page.scss'],
})
<<<<<<< HEAD
=======
<<<<<<< HEAD
export class Tab1DetailsPage {
  @ViewChild('chartCanvas', { static: true })
  chartCanvas!: ElementRef;
  chart: any;
  selectedCoin: any = null;
  filteredCoins: any[] = [];
=======
>>>>>>> de0472b54fd71bc62e53825a043dca3bee9e2636
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
<<<<<<< HEAD

  constructor() { }

  ngOnInit() {
  }

  viewCoinDetails(id: string) {
=======
>>>>>>> 64701ef9a80c71ff735964bf31530d21deb7e8e1


  constructor(private coingeckoService: CoingeckoService, private router: Router) {}

  ionViewDidEnter() {
    // Vérifiez si un coin est sélectionné
    if (this.selectedCoin) {
      this.showChart();
    } else {
      // Si aucun coin n'est sélectionné, vous pouvez rediriger vers une autre page ou prendre une autre action
    }
  }

  viewCoinDetails(id: string) {
<<<<<<< HEAD
    this.coingeckoService.getCoinDetails(id).subscribe((coin) => {
    this.selectedCoin = coin;
    console.log(this.selectedCoin);
    });
  }


=======
>>>>>>> de0472b54fd71bc62e53825a043dca3bee9e2636
    this.coingeckoService.getCoinDetails(id).subscribe((coin: any) => {
    this.selectedCoin = coin;
    });
  }

<<<<<<< HEAD
=======
>>>>>>> 64701ef9a80c71ff735964bf31530d21deb7e8e1
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
=======
<<<<<<< HEAD

    this.coingeckoService.getCoinPriceHistory(this.selectedCoin.id).subscribe((prices: any[]) => {
      prices.forEach(price => {
        const date = new Date(price[0]);
=======
>>>>>>> de0472b54fd71bc62e53825a043dca3bee9e2636
  
  
    this.coingeckoService.getCoinPriceHistory(this.selectedCoin.id).subscribe((prices: any[]) => {

      prices.forEach(price => {
      const date = new Date(price[0]);
<<<<<<< HEAD
=======
>>>>>>> 64701ef9a80c71ff735964bf31530d21deb7e8e1
>>>>>>> de0472b54fd71bc62e53825a043dca3bee9e2636
        chartData.labels.push(date.toLocaleDateString());
        chartData.datasets[0].data.push(price[1]);
      });
      console.log(chartData);
<<<<<<< HEAD
=======
<<<<<<< HEAD

      moment.locale('fr');
      Chart.register(...registerables);

      chartData.datasets[0].borderColor = 'lightblue';
=======
>>>>>>> de0472b54fd71bc62e53825a043dca3bee9e2636
  
      moment.locale('fr');
      Chart.register(...registerables); // Enregistrer tous les modules nécessaires

      chartData.datasets[0].borderColor = 'lightblue';
      // Création du graphique
<<<<<<< HEAD
=======
>>>>>>> 64701ef9a80c71ff735964bf31530d21deb7e8e1
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
}
