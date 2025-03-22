// src/app/components/tasks/tasks.component.ts
import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { Task } from './models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  imports: [CommonModule],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = []; // Danh sách nhiệm vụ
  taskForm: FormGroup; // Form để thêm/sửa nhiệm vụ
  editMode = false; // Kiểm tra trạng thái chỉnh sửa
  selectedTask: Task | null = null; // Lưu nhiệm vụ đang chỉnh sửa
  errorMessage = ''; // Hiển thị lỗi nếu có
  isLoading = true; // Kiểm soát trạng thái tải dữ liệu

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    // Khởi tạo form với các điều kiện kiểm tra
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      completed: [false],
    });
  }

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit(): void {
    this.fetchTasks(); // Tải danh sách nhiệm vụ khi khởi động component
  }

  // ✅ Tải danh sách nhiệm vụ từ API
  fetchTasks(): void {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        this.errorMessage = 'Không thể tải danh sách nhiệm vụ. Vui lòng thử lại.';
        this.isLoading = false;
      },
    });
  }

  // ✅ Thêm nhiệm vụ mới
  addTask(): void {
    if (this.taskForm.invalid) return;

    this.taskService.createTask(this.taskForm.value).subscribe({
      next: (newTask) => {
        this.tasks.push(newTask); // Thêm nhiệm vụ mới vào danh sách
        this.resetForm();
      },
      error: (error) => {
        console.error('Error adding task:', error);
        this.errorMessage = 'Thêm nhiệm vụ thất bại. Vui lòng thử lại.';
      },
    });
  }

  // ✅ Sửa nhiệm vụ
  editTask(task: Task): void {
    this.editMode = true;
    this.selectedTask = task;
    this.taskForm.patchValue(task); // Đổ dữ liệu vào form
  }

// ✅ Cập nhật nhiệm vụ
updateTask(): void {
  if (!this.selectedTask || this.taskForm.invalid) return;

  const updatedTask = { ...this.selectedTask, ...this.taskForm.value };

  // Gọi updateTask() với 2 tham số: id và updatedTask
  this.taskService.updateTask(updatedTask.id, updatedTask).subscribe({
    next: () => {
      // Cập nhật danh sách nhiệm vụ
      const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
      if (index !== -1) this.tasks[index] = updatedTask;
      this.resetForm();
    },
    error: (error) => {
      console.error('Error updating task:', error);
      this.errorMessage = 'Cập nhật nhiệm vụ thất bại. Vui lòng thử lại.';
    },
  });
}

// ✅ Hàm resetForm() để làm mới form
// resetForm(): void {
//   this.taskForm.reset();
//   this.editMode = false;
//   this.selectedTask = null;
// }


  // ✅ Xóa nhiệm vụ
  deleteTask(task: Task): void {
    if (!task.id) {
      this.errorMessage = 'Nhiệm vụ không hợp lệ!';
      return;
    }
  
    if (confirm(`Bạn có chắc muốn xóa nhiệm vụ "${task.title}"?`)) {
      this.taskService.deleteTask(task.id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter((t) => t.id !== task.id);
        },
        error: (error) => {
          console.error('Error deleting task:', error);
          this.errorMessage = 'Xóa nhiệm vụ thất bại. Vui lòng thử lại.';
        },
      });
    }
  }
  

  // ✅ Hủy chế độ chỉnh sửa và đặt lại form
  resetForm(): void {
    this.taskForm.reset({ completed: false });
    this.editMode = false;
    this.selectedTask = null;
  }
}
