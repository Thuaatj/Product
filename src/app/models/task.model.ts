// export interface Task {
//     id?: number;
//     title: string;
//     description?: string;
//     completed: boolean;
//     createdAt?: Date;
//     updatedAt?: Date;
//   }
// src/app/components/tasks/tasks.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksComponent } from '../components/tasks/tasks.component';
import { AddTaskComponent } from '../components/add-task/add-task.component';

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'add', component: AddTaskComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // ✅ Sử dụng forChild cho module con
    FormsModule,
    ReactiveFormsModule,
    TasksComponent,
    AddTaskComponent,
  ],
})
export class TasksModule {}


