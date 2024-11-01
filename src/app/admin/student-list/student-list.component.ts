import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  branch: string;
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class StudentListComponent {
  students: Student[] = [];
  private apiUrl = 'http://localhost:8080/admin/students'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {    
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.http.get<Student[]>(this.apiUrl).subscribe(
      (data: Student[]) => {this.students = data},
      error => console.error('Error fetching students', error)
    );
  }
}
