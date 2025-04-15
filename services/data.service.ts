import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getExampleData(): string[] {
    console.log('Используются локальные данные');
    return ['Data1', 'Data2', 'Data3'];
  }

  getJsonData(): Observable<any> {
    return this.http.get('assets/data.json');
  }
}