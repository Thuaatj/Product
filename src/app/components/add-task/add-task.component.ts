// src/app/components/add-task/add-task.component.ts
import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-task',
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  standalone: true, 

})
export class AddTaskComponent {
  taskForm: FormGroup;
  errorMessage = '';

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    public router: Router // ✅ Router stays here for navigation
  ) {
    // Initialize the form using FormBuilder
    this.taskForm = this.fb.group({
      title: ['', Validators.required],      // Required title
      description: [''],                     // Optional description
      completed: [false],                    // Default: not completed
    });
  }

  // Submit the form to add a task
  addTask(): void {
    if (this.taskForm.invalid) {
      this.errorMessage = 'Vui lòng nhập đủ thông tin.';
      return;
    }

    this.taskService.createTask(this.taskForm.value).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (err) => {
        console.error('Error adding task:', err);
        this.errorMessage = 'Lỗi khi thêm công việc, vui lòng thử lại.';
      },
    });
  }
}
