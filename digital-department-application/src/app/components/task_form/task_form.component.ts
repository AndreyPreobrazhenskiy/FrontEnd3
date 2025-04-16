import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-form',
  templateUrl: './task_form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class TaskFormComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.form = this.fb.group({
      type: ['', Validators.required],
      priority: ['medium'],
      status: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      assignee: [''],
      creator: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      this.taskService.addTask(this.form.value as any);
      this.form.reset({ priority: 'medium' });
    }
  }
}
