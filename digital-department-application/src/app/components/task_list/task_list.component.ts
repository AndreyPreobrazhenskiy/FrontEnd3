import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task_list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    DatePipe
  ]
})
  export class TaskListComponent {
    tasks$: Observable<Task[]>;
  
    constructor(private taskService: TaskService) {
      this.tasks$ = this.taskService.getTasks();
    }
  }
  