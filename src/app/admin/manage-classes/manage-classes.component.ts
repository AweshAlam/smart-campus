import { Component, OnInit } from '@angular/core';
import { ClassScheduleService } from '../../../../service/class-schedule.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes.component.html',
  styleUrls: ['./manage-classes.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class ManageClassesComponent {
  classSchedules: any[] = [];
  newClassSchedule = { id: '', day: '', subject: '', startTime: '', endTime: '' };
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
        this.newClassSchedule = { id: '', day: '', subject: '', startTime: '', endTime: '' };
      },
      error: (err) => console.error('Error adding class schedule', err),
    });
  }

  startEdit(classSchedule: any) {
    this.editMode = true;
    this.editingClassSchedule = { ...classSchedule };
    // Copy the edited schedule into the newClassSchedule form
    this.newClassSchedule = { ...classSchedule };
  }

  updateClassSchedule() {
    this.classScheduleService
      .updateClassSchedule(this.editingClassSchedule.id, this.newClassSchedule)
      .subscribe({
        next: () => {
          this.fetchClassSchedules();
          this.editMode = false;
          this.newClassSchedule = { id: '', day: '', subject: '', startTime: '', endTime: '' };
        },
        error: (err) => console.error('Error updating class schedule', err),
      });
  }

  deleteClassSchedule(id: string) {
    this.classScheduleService.deleteClassSchedule(id).subscribe({
      next: () => this.fetchClassSchedules(),
      error: (err) => console.error('Error deleting class schedule', err),
    });
  }
}
