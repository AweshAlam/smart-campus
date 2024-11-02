import { Component, OnInit } from '@angular/core';
import { ClassScheduleService } from '../../../../service/class-schedule.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes.component.html',
  styleUrls: ['./manage-classes.component.css'],
  imports: [CommonModule,FormsModule],
  standalone: true
})
export class ManageClassesComponent {
  classSchedules: any[] = [];
  newClassSchedule = {cs_id:'', sec: '', day: '', time: '', subject: '' };
  editMode = false;
  editingClassSchedule: any = null;

  constructor(private classScheduleService: ClassScheduleService) {
    this.fetchClassSchedules();

  }
  fetchClassSchedules() {
    this.classScheduleService.getClassSchedules().subscribe({
      next: (data) => {
        this.classSchedules = data;
      },
      error: (err) => console.error('Error fetching class schedules', err),
    });
  }

  addClassSchedule() {
    this.classScheduleService.createClassSchedule(this.newClassSchedule).subscribe({
      next: () => {
        this.fetchClassSchedules();
        this.newClassSchedule = {cs_id:'', sec: '', day: '', time: '', subject: '' };
      },
      error: (err) => console.error('Error adding class schedule', err),
    });
  }

  startEdit(classSchedule: any) {
    this.editMode = true;
    this.editingClassSchedule = { ...classSchedule };
  }

  updateClassSchedule() {
    this.classScheduleService
      .updateClassSchedule(this.editingClassSchedule.cs_id, this.editingClassSchedule)
      .subscribe({
        next: () => {
          this.fetchClassSchedules();
          this.editMode = false;
          this.editingClassSchedule = null;
        },
        error: (err) => console.error('Error updating class schedule', err),
      });
  }

  deleteClassSchedule(cs_id: number) {
    this.classScheduleService.deleteClassSchedule(cs_id).subscribe({
      next: () => this.fetchClassSchedules(),
      error: (err) => console.error('Error deleting class schedule', err),
    });
  }
}
