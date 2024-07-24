import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FileService } from '../shared/services/file.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Date', 'DO', 'pH', 'Temp'];
  dataSource!: MatTableDataSource<any>;  
  jsonData: any[] = [];  // Define jsonData property

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.jsonData = this.fileService.getJsonFromLocal('jsonData');
    this.dataSource = new MatTableDataSource(this.jsonData);
    // this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  getPhClass(pH: number): string {
    if (pH < 4.0) {
      return 'acid-death';
    } else if (pH >= 4.0 && pH <= 5.0) {
      return 'no-production';
    } else if (pH > 5.0 && pH <= 9.0) {
      return 'desirable-range';
    } else if (pH > 9.0 && pH <= 11.0) {
      return 'slow-growth';
    } else {
      return 'alkaline-death';
    }
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLSelectElement).value;
    if (filterValue) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const pHClass = this.getPhClass(data.pH).toLowerCase();
        return pHClass === filter;
      };
    } else {
      this.dataSource.filter = '';
    }
  }
}
