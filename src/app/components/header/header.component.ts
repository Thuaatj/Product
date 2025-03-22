import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    CommonModule,
    NzIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  items = [
    { label: 'Dashboard', icon: 'home', routerLink: '/dashboard' },
    { label: 'Projects', icon: 'book', routerLink: '/projects' },
    { label: 'Add Project', icon: 'plus', routerLink: '/projects/add' },
    { label: 'Tasks', icon: 'check-circle', routerLink: '/tasks' }  
  ];
}