import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';
import { ItalicDirective } from './directive/italic.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, ItalicDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  users: any[] = [];
  constructor(private router: Router, private dataService: DataService) {}

  goToPage1(): void {
    this.router.navigate(['/page1']);
  }

  goToPage2(): void {
    this.router.navigate(['/page2', 123]);
  }

  goToPage3(): void {
    this.router.navigateByUrl('/page3');
  }
  logServiceData(): void {
    console.log('Обновленные данные:', this.dataService.getExampleData());
  }
}


