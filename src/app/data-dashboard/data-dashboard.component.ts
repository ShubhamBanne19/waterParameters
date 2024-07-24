import { Component, OnInit } from '@angular/core';
import { FileService } from '../shared/services/file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-dashboard',
  templateUrl: './data-dashboard.component.html',
  styleUrls: ['./data-dashboard.component.css']
})
export class DataDashboardComponent implements OnInit {
  jsonData: any;

  constructor(private fileService: FileService, private router : Router) { }

  ngOnInit(): void {
    this.loadLocalJsonData();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileService.parseCsv(file)
        .then(data => {
          this.jsonData = data;
          this.fileService.saveJson(data, 'data.json');
          this.fileService.saveJsonToLocal(data, 'jsonData');
          console.log('CSV converted to JSON, saved, and stored locally.');
        })
        .catch(error => console.error('Error parsing CSV file:', error));
    }
  }

  loadLocalJsonData(): void {
    this.jsonData = this.fileService.getJsonFromLocal('jsonData');
  }

  navigateToCharts(): void {
    this.router.navigate(['/charts']);
    console.log()
  }
  
  navigateToTables(): void {
    this.router.navigate(['/tables']);
  } 
}
