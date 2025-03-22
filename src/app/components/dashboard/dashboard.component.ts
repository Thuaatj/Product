import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [RouterLink, CommonModule]
})
export class DashboardComponent implements OnInit {
  isLoading = true; 
  errorMessage = ''; 

  totalMembers = 12; 
  upcomingProjectsPercent = 80; 

  projects = [
    { id: 1, name: 'Website Quản Lý', start_date: '2024-02-01' },
    { id: 2, name: 'Ứng Dụng Mobile', start_date: '2024-03-15' },
    { id: 3, name: 'CRM System', start_date: '2024-04-10' },
  ];

  // Danh sách thành viên theo vùng
  eastMembers = [
    { name: 'Nguyễn Văn A', status: 'Đang làm việc' },
    { name: 'Trần Thị B', status: 'Đang nghỉ phép' },
  ];
  westMembers = [
    { name: 'Lê Văn C', status: 'Đang làm việc' },
    { name: 'Phạm Văn D', status: 'Đang nghỉ phép' },
  ];
  southMembers = [
    { name: 'Hoàng Thị E', status: 'Đang làm việc' },
    { name: 'Đinh Văn F', status: 'Đang đào tạo' },
  ];

  constructor() {
    // Placeholder constructor for future logic
  }

  ngOnInit(): void {
    // Giả lập quá trình tải dữ liệu từ API
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  // Hàm xóa dự án
  deleteProject(id: number) {
    this.projects = this.projects.filter((project) => project.id !== id);
    alert('Dự án đã được xóa thành công!');
  }
}
