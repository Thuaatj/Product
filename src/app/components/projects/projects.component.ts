// src/app/components/projects/projects.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Project } from '../../models/project.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  errorMessage = '';
  isLoading = false;
  searchTerm = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  // Load projects from the API
  loadProjects(): void {
    this.isLoading = true;
    this.apiService.getProjects().subscribe({
      next: (data: Project[]) => {
        this.projects = data;
        this.filteredProjects = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Lỗi khi tải dự án, thử lại sau!';
        this.isLoading = false;
        console.error('Error loading projects:', err);
      },
    });
  }

  // Delete a project
  deleteProject(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa dự án này không?')) {
      this.apiService.deleteProject(id).subscribe({
        next: () => this.loadProjects(),
        error: (err) => console.error('Error deleting project:', err),
      });
    }
  }

  // Navigate to edit project page
  editProject(project: Project): void {
    this.router.navigate(['/projects/edit', project.id]);
  }

  // Search projects by name
  searchProjects(): void {
    this.filteredProjects = this.projects.filter((project) =>
      project.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Navigate to add project page
  openAddProject(): void {
    this.router.navigate(['/projects/add']);
  }
}
