  import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
  import Chart from 'chart.js/auto';
  import zoomPlugin from 'chartjs-plugin-zoom';
  import { FileService } from '../shared/services/file.service';
  import { DataService } from '../shared/services/data.service';

  Chart.register(zoomPlugin);

  @Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
  })
  export class ChartComponent implements OnInit, AfterViewInit {
    jsonData: any[] = [];
    @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;

    chart: Chart<'line'> | undefined;

    showDO = true;
    showPH = true;
    showTemp = true;
  

    constructor(private fileService: FileService) { }

    ngOnInit(): void {
      this.jsonData = this.fileService.getJsonFromLocal('jsonData');
      console.log('JSON data:', this.jsonData);
      
    }
    ngAfterViewInit(): void {
      if (this.jsonData) {
        this.renderChart();
      } else {
        console.log('jsonData is not available.');
      }
    }

    renderChart(): void {
      console.log('Rendering chart...');
      if (this.jsonData && this.chartCanvas) {
        console.log('chartCanvas:', this.chartCanvas.nativeElement);
        const dates = this.jsonData.map((item: { Date: string }) => item.Date);
        const dos = this.jsonData.map((item: { DO: string }) => parseFloat(item.DO));
        const phs = this.jsonData.map((item: { pH: string }) => parseFloat(item.pH));
        const temps = this.jsonData.map((item: { Temp: string }) => parseFloat(item.Temp));
  
        console.log('Dates:', dates);
        console.log('DO:', dos);
        console.log('pH:', phs);
        console.log('Temp:', temps);
  
        this.chart = new Chart(this.chartCanvas.nativeElement, {
          type: 'line',
          data: {
            labels: dates,
            datasets: [
              { data: dos, label: 'Dissolved Oxygen', borderColor: 'blue', fill: false, hidden: !this.showDO },
              { data: phs, label: 'pH', borderColor: 'green', fill: false, hidden: !this.showPH },
              { data: temps, label: 'Temperature', borderColor: 'red', fill: false, hidden: !this.showTemp }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
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
                  text: 'Value'
                }
              }
            },
            plugins: {
              zoom: {
                pan: {
                  enabled: true,
                  mode: 'xy',
                },
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true
                  },
                  mode: 'xy'
                }
              }
            }
          }
        });
  
        console.log('Chart object:', this.chart);
      } else {
        console.log('jsonData or chartCanvas is not available.');
      }
    }
    zoomIn(): void {
      this.chart?.zoom(1.1); // Zoom in by 10%
    }
  
    zoomOut(): void {
      this.chart?.zoom(0.9); // Zoom out by 10%
    }
  
    resetZoom(): void {
      this.chart?.resetZoom();
    }
    toggleDataset(datasetLabel: string): void {
      const dataset = this.chart?.data.datasets.find(ds => ds.label === datasetLabel);
      if (dataset) {
        dataset.hidden = !dataset.hidden;
        this.chart?.update();
      }
    }
 // backend integrated code
  // @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement> | undefined;
  // chart!: Chart<'line'> ;
  // jsonData: any;

  // constructor(private dataService: DataService) {}

  // ngOnInit(): void {
  //   const csvUrl = 'http://localhost:3000/api/csv'; 
  //   this.dataService.fetchCSVData(csvUrl).subscribe(data => {
  //     this.jsonData = data;
  //     this.renderChart();
  //   });
  // }

  // renderChart(): void {
  //   if (this.jsonData && this.chartCanvas) {
  //     const dates = this.jsonData.map((item: { Date: string }) => item.Date);
  //     const dos = this.jsonData.map((item: { DO: string }) => parseFloat(item.DO));
  //     const phs = this.jsonData.map((item: { pH: string }) => parseFloat(item.pH));
  //     const temps = this.jsonData.map((item: { Temp: string }) => parseFloat(item.Temp));

  //     console.log("ChartData", dates, dos, phs, temps);
      
  //     this.chart = new Chart(this.chartCanvas.nativeElement, {
  //       type: 'line',
  //       data: {
  //         labels: dates,
  //         datasets: [
  //           { data: dos, label: 'DO', borderColor: 'blue', fill: false },
  //           { data: phs, label: 'pH', borderColor: 'green', fill: false },
  //           { data: temps, label: 'Temperature', borderColor: 'red', fill: false }
  //         ]
  //       },
  //       options: {
  //         responsive: true,
  //         maintainAspectRatio: false,
  //         scales: {
  //           x: {
  //             display: true,
  //             title: {
  //               display: true,
  //               text: 'Date'
  //             }
  //           },
  //           y: {
  //             display: true,
  //             title: {
  //               display: true,
  //               text: 'Value'
  //             }
  //           }
  //         }
  //       }
  //     });
  //   }
  // }
}
