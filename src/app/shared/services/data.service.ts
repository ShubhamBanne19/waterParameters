import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  fetchCSVData(url: string): Observable<any[]> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(csvData => {
        const parsedData = Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true
        });
        return parsedData.data;
      })
    );
  }
}
