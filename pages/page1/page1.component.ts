import { Component } from '@angular/core';
import { CanComponentDeactivate } from '../../guards/can-deactivate-guard.guard';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements CanComponentDeactivate {
  constructor(private dataService: DataService) {
    console.log('Данные из сервиса:', this.dataService.getExampleData());
  }
  
  canDeactivate(): boolean {
    return window.confirm('Вы уверены, что хотите покинуть страницу?');
  }
}
