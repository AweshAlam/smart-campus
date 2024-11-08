import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../../service/student.service';
import { ClassScheduleService } from '../../../../service/class-schedule.service';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule]
})
export class StudentRegistrationComponent implements OnInit {
  reg_no: string = '';
  s_name: string = '';
  email: string = '';
  mob_no: string = '';
  errorMessage: string = '';
  schedules: any[] = [];
  selectedScheduleIds: string[] = [];

  constructor(
    private studentService: StudentService,private classSchedule: ClassScheduleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.classSchedule.getClassSchedules().subscribe({
      next: (data) => {
        this.schedules = data;
      },
      error: (error) => {
        console.error('Error fetching schedules:', error);
        this.errorMessage = 'Could not load schedules. Please try again later.';
      }
    });
  }

  onScheduleChange(scheduleId: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedScheduleIds.push(scheduleId);
    } else {
      this.selectedScheduleIds = this.selectedScheduleIds.filter(id => id !== scheduleId);
    }
  }

  register() {
    const studentData = {
      reg_no: this.reg_no,
      s_name: this.s_name,
      email: this.email,
      mob_no: this.mob_no,
      scheduleIds: this.selectedScheduleIds
    };

    this.studentService.registerStudent(studentData).subscribe({
      next: () => {
        alert("Student Registered Successfully.");
        // this.router.navigate(['admin/student/register']);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }
}
