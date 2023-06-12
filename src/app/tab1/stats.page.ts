import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoingeckoService } from '../coingecko.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  cryptoId: string | null = null;
  crypto: any;
  chart!: Chart;

  constructor(private route: ActivatedRoute, private coingeckoService: CoingeckoService) {}

  ngOnInit() {
    this.cryptoId = this.route.snapshot.paramMap.get('id') || null;
    if (this.cryptoId) {
      this.coingeckoService.getCoinDetails(this.cryptoId).subscribe((data) => {
        this.crypto = data;
        this.showChart();
      });
    }
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

    this.coingeckoService.getCoinPriceHistory(this.cryptoId!).subscribe((prices: any[]) => {
      prices.forEach(price => {
        const date = new Date(price[0]);
        chartData.labels.push(date.toLocaleDateString());
        chartData.datasets[0].data.push(price[1]);
      });

      Chart.register(...registerables);

      chartData.datasets[0].borderColor = 'lightblue';
      this.chart = new Chart('cryptoChart', {
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
                text: 'Price'
              }
            }
          }
        }
      });
    });
  }
}
