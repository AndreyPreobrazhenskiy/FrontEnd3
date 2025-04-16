import { Component } from '@angular/core';
import { TaskFormComponent } from './components/task_form/task_form.component';
import { TaskListComponent } from './components/task_list/task_list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}