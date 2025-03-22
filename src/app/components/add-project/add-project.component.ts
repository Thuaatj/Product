// src/app/components/add-project/add-project.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  imports: [CommonModule, ReactiveFormsModule], // Thêm CommonModule ở đây
  standalone: true,
  providers: [TaskService] 
})
export class AddProjectComponent {
  projectForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public router: Router
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      date_of_start: ['', Validators.required],
      team_size: [0, [Validators.required, Validators.min(1)]],
    });
  }

  addProject(): void {
    if (this.projectForm.invalid) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin.';
      return;
    }

    this.apiService.addProject(this.projectForm.value).subscribe({
      next: () => {
        this.router.navigate(['/projects']);
      },
      error: () => {
        this.errorMessage = 'Lỗi khi thêm dự án, vui lòng thử lại.';
      },
    });
  }
}
