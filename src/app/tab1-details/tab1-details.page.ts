import { Component, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
import * as moment from 'moment';
import { CoingeckoService } from '../coingecko.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1-details',
  templateUrl: './tab1-details.page.html',
  styleUrls: ['./tab1-details.page.scss'],
})
export class Tab1DetailsPage {
  @ViewChild('chartCanvas', { static: true })
  chartCanvas!: ElementRef;
  chart: any;
  selectedCoin: any = null;
  filteredCoins: any[] = [];


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
      Chart.register(...registerables);

      chartData.datasets[0].borderColor = 'lightblue';
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
