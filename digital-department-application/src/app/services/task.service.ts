import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [];
  private idCounter = 1;
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  tasks$ = this.tasksSubject.asObservable();

  addTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
    const newTask: Task = {
      ...taskData,
      id: this.idCounter++,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks);
  }

  updateTask(id: number, updates: Partial<Task>) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updates, updatedAt: new Date() };
      this.tasksSubject.next(this.tasks);
    }
  }

  getTasks() {
    return this.tasks$;
  }
}
